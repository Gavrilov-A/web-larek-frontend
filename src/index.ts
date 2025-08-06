import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ProductData } from './components/modelData/ProductData';
import { ProductCard } from './components/view/ProductCard';
import { Page } from './components/view/Page';


const events = new EventEmitter();
const larekApi = new LarekApi(CDN_URL, API_URL);
const productData = new ProductData(events);



// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderPayTemplate = ensureElement<HTMLTemplateElement>('#order');
const orderContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');



const page = new Page(document.querySelector('.page'), events);


larekApi
	.getProductList()
	.then(data => productData.setProductList(data))
	.catch((err) => {
		console.error(err);
	});

	events.on('productList: changed', ()=>{
		const itemsHtmlArray = productData.getProductList().map(item => new ProductCard(cloneTemplate(cardCatalogTemplate), events).render({
			category: item.category,
			title: item.title,
			image: item.image,
			price: item.price,
		}));
		page.render({
			productList:itemsHtmlArray
		})
		
	})

