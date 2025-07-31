import { IOrder, IProduct, IProductList } from "../types";
import { Api } from "./base/api";

interface ILarekApi {
    getProductList(): ()=> Promise<IProductList>
    getProductById(): ()=> Promise<IProduct>
    postOrder(): ()=> Promise<IOrder>
}

export class LarekApi extends Api {
    getProductList(){

    }

    getProductById(){}

    postOrder(){}
}