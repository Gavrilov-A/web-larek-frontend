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
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = ensureElement('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = ensureElement('#card-basket') as HTMLTemplateElement;
const basketTemplate = ensureElement('#basket') as HTMLTemplateElement;
const orderPayTemplate = ensureElement('#order') as HTMLTemplateElement;
const orderContactsTemplate = ensureElement('#contacts') as HTMLTemplateElement;
const successTemplate = ensureElement('#success') as HTMLTemplateElement;

const page = new Page(document.querySelector('.page__wrapper'), events);

larekApi
	.getProductList()
	.then((data) => productData.setProductList(data))
	.catch((err) => {
		console.error(err);
	});

events.on('productList:changed', () => {
	const itemsHtmlArray = productData.getProductList().map((item) => new ProductCard(cloneTemplate(cardCatalogTemplate), events).render(item));
	page.render({
		productList: itemsHtmlArray,
	});
});