import {
	FormErrors,
	IOrder,
	IOrderData,
	IProduct,
	TBasketItem,
	TFormOrder,
} from '../../types';
import { IEvents } from '../base/events';

export class OrderData implements IOrderData {
	protected _productList: TBasketItem[];
	protected _order: IOrder;
	formErrors: FormErrors = {};

	constructor(protected events: IEvents) {
		this._productList = [];
		this._order = {
			payment: '',
			email: '',
			phone: '',
			address: '',
			total: 0,
			items: [],
		};
	}

	set productList(items: TBasketItem[]) {
		this._productList = items;
	}

	get productList() {
		return this._productList;
	}

	set order(orderFields: IOrder){
		this._order = orderFields
	}

	addProduct(item: TBasketItem) {
		if (!this._productList.some((product) => product.id === item.id)) {
			if (item.price !== null) this._productList.push(item);
			this._order.items.push(item.id);
			this.events.emit('productAdded');
			console.log(this._productList);
		} else console.log('error');
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

	setOrderField(field: keyof TFormOrder, value: string) {
		console.log(value)
        this._order[field] = value;

        if (this.validateOrder()) {
            this.events.emit('order:ready', this.order);
        }
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};
		if (!this._order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		if (!this._order.address) {
			errors.address = 'Необходимо указать адрес';
		}
        if (!this._order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this._order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}
