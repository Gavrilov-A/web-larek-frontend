import {
	IOrder,
	IOrderData,
	IProduct,
	TBasketItem,
	TOrderContacts,
	TOrderPayment,
} from '../../types';
import { IEvents } from '../base/events';

export class OrderData implements IOrderData {
	protected _productList: TBasketItem[];
	protected _order: IOrder = {
		payment: '',
		email: '',
		phone: '',
		address: '',
		total: 0,
		items: [],
	};

	constructor(protected events: IEvents) {
		this._productList = [];
	}

	set productList(items: TBasketItem[]) {
		this._productList = items;
	}

	get productList() {
		return this._productList;
	}

	addProduct(item: TBasketItem) {

		    if (!this._productList.some(product => product.id === item.id)) {
					if(item.price!==null)
		        this._productList.push(item)
		        this._order.items.push(item.id)
		        this.events.emit('productAdded')
		        console.log(this._productList)
		    }
		 else console.log('error')
	}

	deleteProduct(id: string) {
		if (this._productList.some((item) => item.id === id)) {
			this._productList = this._productList.filter(
				(itemId) => itemId.id !== id
			);
			this._order.items = this._order.items.filter((itemId) => itemId !== id);
			this.updateTotal();
			this.events.emit('productRemoved', this._order.items);
		}
	}

	getTotal(): number {
		let total = 0;
		this._productList.forEach((item) => {
			total += item.price;
		});
		return total || 0;
	}

	updateTotal() {
		this._order.total = this.getTotal();
		this.events.emit('totalUpdated', this._order);
	}

	checkValidation(
		data:
			| Record<keyof TOrderPayment, string>
			| Record<keyof TOrderContacts, string>
	): boolean {
		const errors: Record<string, string> = {};
		
		if (!this._order.email) {
		    errors.email = 'Email обязателен';
		}

		if (!this._order.phone) {
		    errors.phone = 'Телефон обязателен';
		}

		if (!this._order.address) {
		    errors.address = 'Адрес обязателен';
		}

		if (Object.keys(errors).length > 0) {
		    this.events.emit('validationError', errors);
		    return false;
		}

		this._order.total = this.getTotal();
		this.events.emit('orderValidated');
		return true;
	}
}
