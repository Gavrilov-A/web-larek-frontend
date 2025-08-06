import { IOrder, IProduct, IProductList, IProductData } from "../../types/index";
import { IEvents } from "../base/events";

export class ProductData {
    protected productList: IProduct[] = []
    protected preview: string | null = null;

    constructor(protected events: IEvents) { }

    setProductList(items: IProduct[]) { //заполняем массив
        this.productList = items
        this.events.emit('productList: changed');
    }

    getProductList(): IProduct[] {//получаем массив карточек товара
        return this.productList
    }

    getProductById(id: string): IProduct { //получаем объект по id
        const product = this.productList.find(item => item.id === id);
        return product || null;
    }

    setPreview(id: string | null): void {
        this.preview = id;
        this.events.emit('previewUpdated');
    }

    getPreview(): string | null {
        return this.preview;
    }
    
}

