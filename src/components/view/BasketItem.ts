import { TBasketItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class BasketItem extends Component<TBasketItem> {
	protected itemId: string;
	protected _count: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected deleteButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this._count = ensureElement(
			'.basket__item-index',
			this.container
		) as HTMLElement;
		this._title = ensureElement('.card__title', this.container) as HTMLElement;
		this._price = ensureElement('.card__price', this.container) as HTMLElement;
		this.deleteButton = ensureElement(
			'.basket__item-delete',
			this.container
		) as HTMLButtonElement;
		this.deleteButton.addEventListener('click', () => {
			this.events.emit('product:removeBasket', { id: this.itemId });
		});
		
	}

	set id(value: string) {
		this.itemId = value;
	}
	set title(value: string) {
		this.setText(this._title, value);
	}
	set price(value: number) {
		this.setText(this._price, `${value} синапсов`);
	}

	setCounter(value: number){
		this.setText(this._count, String(value))
	}
}
