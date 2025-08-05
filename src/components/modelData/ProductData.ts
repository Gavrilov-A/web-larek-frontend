import { IOrder, IProduct, IProductList, IProductsData } from "../../types/index";
import { IEvents } from "../base/events";

export class ProductData {
    protected _productList: IProductList;
    protected _preview: string | null;

    constructor(protected events: IEvents) { }

    setProductList(objCards: IProductList) { //заполняем массив
        this._productList.items = objCards.items
    }

    getProductList(): IProduct[] {//получаем массив карточек товара
        return this._productList.items
    }

    // getProductById(id: string): IProduct { //получаем объект по id
    //     return this._items.find(item => item.id === id)
    // }

    
}

