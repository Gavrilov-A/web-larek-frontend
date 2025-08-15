import { TBasketItem } from '../../types';
import { createElement, ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

interface IBasket {
	list: HTMLElement[];
	totalPrice: number;
}

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected orderButton: HTMLButtonElement;
	protected _totalPrice: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this._list = ensureElement('.basket__list', this.container) as HTMLElement;
		this._totalPrice = ensureElement(
			'.basket__price',
			this.container
		) as HTMLElement;
		this.orderButton = container.querySelector(
			'.basket__button'
		) as HTMLButtonElement;
		this.orderButton.addEventListener('click', () => {
			events.emit('basket:submit');
		});

		this.list = [];
		this.totalPrice = 0;
	}

	set list(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this.setDisabled(this.orderButton, false);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.setDisabled(this.orderButton, true);
		}
	}
	set totalPrice(value: number) {
		this.setText(this._totalPrice, `${value} синапсов`);
	}

	get totalPrice(){
		return this.totalPrice
	}
}

