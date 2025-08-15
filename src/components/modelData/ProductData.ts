import { IOrder, IProduct, IProductData } from '../../types/index';
import { IEvents } from '../base/events';

export class ProductData implements IProductData {
	protected productList: IProduct[];
	constructor(protected events: IEvents) {
		this.productList = [];
	}

	setProductList(items: IProduct[]) {
		this.productList = items;
		this.events.emit('productList:changed');
	}

	getProductList(): IProduct[] {
		return this.productList;
	}

	getProductById(id: string): IProduct {
		const product = this.productList.find((item) => item.id === id);
		return product || null;
	}
}
