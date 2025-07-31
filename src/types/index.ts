export interface IProduct {
	id: string;
	description?: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IProductList {
	total: number;
	items: IProduct[];
}

export interface IOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: TProductId[];
}


export type TProductId = Pick<IProduct, 'id'>;

export type TBasketItem = Pick<IProduct, 'title' | 'price'>

export type TBasketPrice = Pick<IProduct, 'id' | 'price'>

export type TOrderPayment = Pick<IOrder, 'payment' | 'address'>

export type TOrderContacts = Pick<IOrder, 'email' | 'phone'>




