export interface IProduct {
	id: string;
	description?: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IOrderResult {
	id: string,
	total: number
}

export interface IProductList {
	total: number;
	items: IProduct[];
}

export interface IProductData {
	setProductList(items: IProduct[]): void;
	getProductList(): IProduct[];
	getProductById(id: string): IProduct;
}

export interface IOrderData {
	products: IProduct[];
	addProduct(product: TBasketItem): void;
	deleteProduct(idProduct: string): void;
	getTotal(): number;
	checkValidation(
		data:
			| Record<keyof TOrderPayment, string>
			| Record<keyof TOrderContacts, string>
	): boolean;
}

export type TBasketItem = Pick<IProduct, 'id' | 'title' | 'price'>;

export type TOrderPayment = Pick<IOrder, 'payment' | 'address'>;

export type TOrderContacts = Pick<IOrder, 'email' | 'phone'>;
