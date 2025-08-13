import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter, IEvents } from './components/base/events';
import { ProductData } from './components/modelData/ProductData'
import { ProductCard, ProductCardPreview } from './components/view/ProductCard';
import { Page } from './components/view/Page';
import { TBasketItem, TFormOrder, TProductId } from './types';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { OrderData } from './components/modelData/OrderData';
import { BasketItem } from './components/view/BasketItem';
import { Form } from './components/view/Form';
import { Order } from './components/view/Order';



const events = new EventEmitter();
const larekApi = new LarekApi(CDN_URL, API_URL);
const productData = new ProductData(events);
const orderData = new OrderData(events);
const page = new Page(document.querySelector('.page__wrapper'), events);


// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Все шаблоны
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = ensureElement('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = ensureElement('#card-basket') as HTMLTemplateElement;
const basketTemplate = ensureElement('#basket') as HTMLTemplateElement;
const orderPayTemplate = ensureElement('#order') as HTMLTemplateElement;
const orderContactsTemplate = ensureElement('#contacts') as HTMLTemplateElement;
const successTemplate = ensureElement('#success') as HTMLTemplateElement;

const modal = new Modal(document.querySelector('.modal'), events);
const basketItem = new BasketItem(cloneTemplate(cardBasketTemplate), events)
const order = new Order(cloneTemplate(orderPayTemplate), events)

events.on('productList:changed', () => {
	const count = orderData.productList.length
	const itemsHtmlArray = productData
		.getProductList()
		.map((item) =>
			new ProductCard(cloneTemplate(cardCatalogTemplate), events).render(item)
		);
	page.render({
		productList: itemsHtmlArray,
		counter: count
	});
});

events.on('product:open', (data: TProductId) => {
	const cardInfo = productData.getProductById(data.id);
	const cardInBasket = orderData.productList;
	const isInBasket = cardInBasket.some((item) => item.id === data.id);
	const card = new ProductCardPreview(
		cloneTemplate(cardPreviewTemplate),
		events
	);
	card.buttonStatus(isInBasket);

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
	const priceBasket = orderData.getTotal();
	const cardInBasket = orderData.productList.map((item, index) =>
		basketItem.render(item)
	);
	const basket = new Basket(cloneTemplate(basketTemplate), events).render({
		list: cardInBasket,
		totalPrice: priceBasket,
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
	const count = orderData.productList.length
	page.render({counter: count})
});

events.on('product:removeBasket', (data: TBasketItem) => {
	orderData.deleteProduct(data.id);
	const cardInBasket = orderData.productList;
	const priceBasket = orderData.getTotal();
	const cardList = cardInBasket.map((item) =>
		new BasketItem(cloneTemplate(cardBasketTemplate), events).render(item)
	);
	const basket = new Basket(cloneTemplate(basketTemplate), events).render({
		list: cardList,
		totalPrice: priceBasket,
	});
	modal.render({
		content: basket,
	});
	const count = orderData.productList.length
	page.render({counter: count})
});

events.on('order:place', ()=>{
	modal.render({
        content: order.render({
			
            valid: false,
            errors: []
        })
    });
	 
})

// Изменилось состояние валидации формы
events.on('formErrors:change', (errors: Partial<TFormOrder>) => {
	// const payment = order.payment;
    
    // // Обновляем состояние заказа
    // orderData.setOrderField('payment', payment || '');
    
    // // Валидируем заказ
    // orderData.validateOrder();
    const {payment, address } = errors;
    order.valid = !payment && !address;
    order.errors = Object.values({payment, address }).filter(i => !!i).join('; ');
});

// Изменилось одно из полей
events.on(/^order\..*:change/, (data: { field: keyof TFormOrder, value: string }) => {

    orderData.setOrderField(data.field, data.value);
});

events.on('modal:open', () => {
	page.setLocked(true);
});

events.on('modal:close', () => {
	page.setLocked(false);
});

larekApi
	.getProductList()
	.then((data) => productData.setProductList(data))
	.catch((err) => {
		console.error(err);
	});
