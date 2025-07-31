import { IOrder, IProduct, TProductId } from "../../types/index";
import { IEvents } from "../base/events";

export class ProductModel {
    protected items: IProduct[] = [];
    protected preview: string | null;

    constructor(protected events: IEvents) { }

    getItems(): IProduct[] {
        return this.items
    }

    getItem(id: string): IProduct {
        return this.items.find(item => item.id === id)
    }

    isInCart(id: string) {
        
    }

    setItems(items: IProduct[]) {
        this.items = items;
    }
}

