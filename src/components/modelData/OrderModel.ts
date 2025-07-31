import { IOrder, TBasketPrice } from "../../types";
import { IEvents } from "../base/events";


export class OrderModel {
    protected basket: string[] = [];
    protected catalog: TBasketPrice[] = [];
    protected loading: boolean;
    protected order: IOrder = {
        payment: '',
        email: '',
        phone: '',
        address: '',
        total: 0,
        items: []
    };

    constructor(protected events: IEvents){}

    addProduct(id: string){

    }

    deleteProduct(id: string){

    }

    getTotal() {
        // return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0)
    }

    validateOrder() {
        
    }

    setProductList(items: { id: string, price: number }[]){
        
    }
}