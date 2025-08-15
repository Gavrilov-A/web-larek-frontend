import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ProductData } from './components/modelData/ProductData';
import { ProductCard, ProductCardPreview } from './components/view/ProductCard';
import { Page } from './components/view/Page';
import {
	IOrderResult,
	TBasketItem,
	TFormContacts,
	TFormOrder,
	TProductId,
} from './types';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { OrderData } from './components/modelData/OrderData';
import { BasketItem } from './components/view/BasketItem';
import { FormOrder } from './components/view/FormOrder';
import { FormContacts } from './components/view/FormContacts';
import { FormSuccess } from './components/view/FormSuccess';

const events = new EventEmitter();
const larekApi = new LarekApi(CDN_URL, API_URL);
const productData = new ProductData(events);
const orderData = new OrderData(events);


// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Все шаблоны
const cardCatalogTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;
const cardPreviewTemplate = ensureElement(
	'#card-preview'
) as HTMLTemplateElement;
const cardBasketTemplate = ensureElement('#card-basket') as HTMLTemplateElement;
const basketTemplate = ensureElement('#basket') as HTMLTemplateElement;
const orderPayTemplate = ensureElement('#order') as HTMLTemplateElement;
const orderContactsTemplate = ensureElement('#contacts') as HTMLTemplateElement;
const successTemplate = ensureElement('#success') as HTMLTemplateElement;

const page = new Page(document.querySelector('.page__wrapper'), events);
const modal = new Modal(document.querySelector('.modal'), events);
const order = new FormOrder(cloneTemplate(orderPayTemplate), events);
const contacts = new FormContacts(cloneTemplate(orderContactsTemplate), events);

events.on('productList:changed', () => {
	const count = orderData.basket.length;
	const itemsHtmlArray = productData
		.getProductList()
		.map((item) =>
			new ProductCard(cloneTemplate(cardCatalogTemplate), events).render(item)
		);
	page.render({
		productList: itemsHtmlArray,
		counter: count,
	});
});

events.on('product:open', (data: TProductId) => {
	const cardInfo = productData.getProductById(data.id);
	const cardInBasket = orderData.basket;
	const isInBasket = cardInBasket.some((item) => item.id === data.id);
	const priceless = cardInfo.price === null;
	const card = new ProductCardPreview(
		cloneTemplate(cardPreviewTemplate),
		events
	);
	card.buttonStatus(isInBasket);
	card.buttonDisabled(priceless);

	modal.render({
		content: card.render({
			id: cardInfo.id,
			title: cardInfo.title,
			image: cardInfo.image,
			description: cardInfo.description,
			price: cardInfo.price,
			category: cardInfo.category,
		}),
	});
});

events.on('basket:open', () => {
	const cardInBasket = orderData.basket.map((item, index) =>{
		const basketItem = new BasketItem(cloneTemplate(cardBasketTemplate), events)
		basketItem.setCounter(index+1)
		return basketItem.render(item)
	}
		
);
	const basket = new Basket(cloneTemplate(basketTemplate), events).render({
		list: cardInBasket,
		totalPrice: orderData.getTotal(),
	});
	modal.render({ content: basket });
});

events.on('product:addBasket', (data: TBasketItem) => {
	const card = productData.getProductById(data.id);
	orderData.addProduct({
		id: card.id,
		title: card.title,
		price: card.price,
	});
	const count = orderData.basket.length;
	page.render({ counter: count });
});

events.on('product:removeBasket', (data: TBasketItem) => {
	orderData.deleteProduct(data.id);
	const cardInBasket = orderData.basket.map((item, index) =>{
		const basketItem = new BasketItem(cloneTemplate(cardBasketTemplate), events)
		basketItem.setCounter(index+1)
		return basketItem.render(item)})
	const basket = new Basket(cloneTemplate(basketTemplate), events).render({
		list: cardInBasket,
		totalPrice: orderData.getTotal(),
	});
	page.render({counter: cardInBasket.length})
	modal.render({
		content: basket,
	});

});

events.on('basket:submit', () => {
	orderData.updateTotal();
	modal.render({
		content: order.render({
			valid: false,
			errors: [],
		}),
	});
});

events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			valid: false,
			errors: [],
		}),
	});
});

events.on('contacts:submit', () => {
	larekApi
		.postOrder(orderData.order)
		.then((result: IOrderResult) => {
			const success = new FormSuccess(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
				},
			});
			orderData.clearBasket();
			page.render({ counter: orderData.basket.length });

			modal.render({
				content: success.render({ total: result.total }),
			});
		})
		.catch((err: Error) => {
			console.error(err);
		});
});

// Изменилось состояние валидации формы заказа
events.on('formErrorsOrder:change', (errors: Partial<TFormOrder>) => {
	const { payment, address } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

// Изменилось состояние валидации формы контактов
events.on('formErrorsContacts:change', (errors: Partial<TFormContacts>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join('; ');
});

// Изменилось одно из полей
events.on(
	/^order\..*:change/,
	(data: { field: keyof TFormOrder; value: string }) => {
		orderData.setOrderField(data.field, data.value);
	}
);

events.on(
	/^contacts\..*:change/,
	(data: { field: keyof TFormContacts; value: string }) => {
		orderData.setContactsField(data.field, data.value);
	}
);

events.on('modal:open', () => {
	page.setLocked(true);
});

events.on('modal:close', () => {
	page.setLocked(false);
	order.reset();
	contacts.reset();
	orderData.clearDataForms();
});

larekApi
	.getProductList()
	.then((data) => productData.setProductList(data))
	.catch((err) => {
		console.error(err);
	});
