import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ProductData } from './components/modelData/ProductData';

const events = new EventEmitter();
const larekApi = new LarekApi(CDN_URL, API_URL);
const productData = new ProductData(events);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderPayTemplate = ensureElement<HTMLTemplateElement>('#order');
const orderContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// const testList = {
// 	total: 10,
// 	items: [
// 		{
// 			id: '854cef69-976d-4c2a-a18c-2aa45046c390',
// 			description: 'Если планируете решать задачи в тренажёре, берите два.',
// 			image: '/5_Dots.svg',
// 			title: '+1 час в сутках',
// 			category: 'софт-скил',
// 			price: 750,
// 		},
// 		{
// 			id: 'c101ab44-ed99-4a54-990d-47aa2bb4e7d9',
// 			description:
// 				'Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.',
// 			image: '/Shell.svg',
// 			title: 'HEX-леденец',
// 			category: 'другое',
// 			price: 1450,
// 		},
// 		{
// 			id: 'b06cde61-912f-4663-9751-09956c0eed67',
// 			description: 'Будет стоять над душой и не давать прокрастинировать.',
// 			image: '/Asterisk_2.svg',
// 			title: 'Мамка-таймер',
// 			category: 'софт-скил',
// 			price: null,
// 		},
// 		{
// 			id: '412bcf81-7e75-4e70-bdb9-d3c73c9803b7',
// 			description:
// 				'Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.',
// 			image: '/Soft_Flower.svg',
// 			title: 'Фреймворк куки судьбы',
// 			category: 'дополнительное',
// 			price: 2500,
// 		},
// 	],
// };

// productData.setProductList(testList)


// console.log(productData.getProductList())


larekApi
	.getProductList()
	.then(productData.getProductList.bind(productData))
	.catch((err) => {
		console.error(err);
	});
