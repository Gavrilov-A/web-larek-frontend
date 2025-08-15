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

export interface IProductData {
	setProductList(items: IProduct[]): void;
	getProductList(): IProduct[];
	getProductById(id: string): IProduct;
}

export interface IOrderData {
	basket: TBasketItem[];
	order: IOrder;
	addProduct(item: TBasketItem): void;
	deleteProduct(idProduct: string): void;
	getTotal(): number;
}

export type TProductId = Pick<IProduct, 'id'>;

export type TBasketItem = Pick<IProduct, 'id' | 'title' | 'price'>;

export type TFormOrder = Pick<IOrder, 'payment' | 'address'>;

export type TFormContacts = Pick<IOrder, 'email' | 'phone'>;

export type FormErrors = Partial<Record<keyof IOrder, string>>;
