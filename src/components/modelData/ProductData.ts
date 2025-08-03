import { IOrder, IProduct } from "../../types/index";
import { IEvents } from "../base/events";

export class ProductModel {
    protected items: IProduct[] = [];
    protected preview: string | null;

    constructor(protected events: IEvents) { }

    getItems(): IProduct[] {//получаем массив карточек товара
        return this.items
    }

    getItem(id: string): IProduct { //получаем объект по id
        return this.items.find(item => item.id === id)
    }

    setItems(items: IProduct[]) { //заполняем массив
        this.items = items;
    }
}

