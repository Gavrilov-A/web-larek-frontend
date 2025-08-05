import { IOrder, IOrderResult, IProduct, IProductList } from "../types";
import { Api, ApiListResponse } from "./base/api";

export interface ILarekApi {
    getProductList: () => Promise<IProduct[]>
    getProductById: (id: string) => Promise<IProduct>
    postOrder: (order: IOrder) => Promise<IOrderResult>
}

export class LarekApi extends Api implements ILarekApi {

    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }
    getProductList(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) => 
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    getProductById(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then((data: IProduct) => data)
    }

    postOrder(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }
}