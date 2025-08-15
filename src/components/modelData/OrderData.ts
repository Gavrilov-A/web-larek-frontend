import {
	FormErrors,
	IOrder,
	IOrderData,
	TBasketItem,
	TFormContacts,
	TFormOrder,
} from '../../types';
import { IEvents } from '../base/events';

export class OrderData implements IOrderData {
	protected _basket: TBasketItem[];
	protected _order: IOrder;
	protected formErrors: FormErrors;

	constructor(protected events: IEvents) {
		this._basket = [];
		this._order = {
			payment: '',
			email: '',
			phone: '',
			address: '',
			total: 0,
			items: [],
		};
		this.formErrors = {};
	}

	get order() {
		return this._order;
	}

	set basket(items: TBasketItem[]) {
		this._basket = items;
	}

	get basket() {
		return this._basket;
	}

	addProduct(item: TBasketItem) {
		if (!this._basket.some((product) => product.id === item.id)) {
			if (item.price !== null) this._basket.push(item);
			this._order.items.push(item.id);
			this.events.emit('productAdded');
		} else console.log('error');
	}

	deleteProduct(id: string) {
		if (this._basket.some((item) => item.id === id)) {
			this._basket = this._basket.filter((itemId) => itemId.id !== id);
			this._order.items = this._order.items.filter((itemId) => itemId !== id);
			this.updateTotal();
			this.events.emit('productRemoved', this._order.items);
		}
	}

	getTotal(): number {
		let total = 0;
		this._basket.forEach((item) => {
			total += item.price;
		});
		return total || 0;
	}

	updateTotal() {
		this._order.total = this.getTotal();
		this.events.emit('totalUpdated', this._order);
	}

	clearDataForms() {
		this._order.payment = '';
		this._order.address = '';
		this._order.email = '';
		this._order.phone = '';
	}

	clearBasket() {
		this._order = {
			payment: '',
			email: '',
			phone: '',
			address: '',
			total: 0,
			items: [],
		};
		this.basket = [];
	}

	setOrderField(field: keyof TFormOrder, value: string) {
		this._order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this._order);
		}
	}

	setContactsField(field: keyof TFormContacts, value: string) {
		this._order[field] = value;

		if (this.validateContacts()) {
			this.events.emit('contacts:ready', this._order);
		}
	}
	validateContacts() {
		const errors: typeof this.formErrors = {};
		if (!this._order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this._order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('formErrorsContacts:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this._order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		if (!this._order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		this.formErrors = errors;
		this.events.emit('formErrorsOrder:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
