import { IOrder, IProduct, TBasketItem, TOrderContacts, TOrderPayment } from "../../types";
import { IEvents } from "../base/events";


export class OrderModel {
    protected _productList: IProduct[] = [];      
    protected _basket: TBasketItem[] = [];
    protected _order: IOrder = {
        payment: '',
        email: '',
        phone: '',
        address: '',
        total: 0,
        items: []
    };

    constructor(protected events: IEvents) { }

    setProductList(items: IProduct[]) {
        this._productList = items;
    }

    addProduct(id: string) {
        const product = this._productList.find(item => item.id === id);
        if (product) {
            if (!this._basket.find(item => item.id === id)) {
                this._basket.push({
                    id: product.id,
                    price: product.price
                })
                this._order.items.push(id)
                this.events.emit('productAdded')
            }
        } else return
    }

    deleteProduct(id: string) {
        if (this._basket.some(item => item.id === id)) {
            this._basket = this._basket.filter(itemId => itemId.id !== id);
            this._order.items = this._order.items.filter(itemId => itemId !== id);
            this.updateTotal();
            this.events.emit('productRemoved', this._order.items);
        }
    }

    getTotal(): number {
        let total = 0
        this._basket.forEach(item => {
            total += item.price
        })
        return total
    }

    updateTotal() {
        this._order.total = this.getTotal();
        this.events.emit('totalUpdated', this._order);
    }

    validateOrder(
        data: 
        Record<keyof TOrderPayment, string> | Record<keyof TOrderContacts, string>
    ): boolean {
        // const errors: Record<string, string> = {};

        // if (!this._order.email) {
        //     errors.email = 'Email обязателен';
        // }

        // if (!this._order.phone) {
        //     errors.phone = 'Телефон обязателен';
        // }

        // if (!this._order.address) {
        //     errors.address = 'Адрес обязателен';
        // }

        // if (this._order.items.length === 0) {
        //     errors.items = 'Корзина пуста';
        // }

        // if (Object.keys(errors).length > 0) {
        //     this.events.emit('validationError', errors);
        //     return false;
        // }

        // this._order.total = this.getTotal();
        // this.events.emit('orderValidated');
        return true;
    }

}