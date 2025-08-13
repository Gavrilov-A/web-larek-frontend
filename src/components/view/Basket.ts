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
	protected nextButton: HTMLButtonElement;
	protected _totalPrice: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this._list = ensureElement('.basket__list', this.container) as HTMLElement;
		this._totalPrice = ensureElement(
			'.basket__price',
			this.container
		) as HTMLElement;
		this.nextButton = container.querySelector(
			'.basket__button'
		) as HTMLButtonElement;
		this.nextButton.addEventListener('click', () => {
			events.emit('basket:place');
		});

		this.list = [];
	}

	set list(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this.setDisabled(this.nextButton, false);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.setDisabled(this.nextButton, true);
		}
	}

	set totalPrice(value: number) {
		this.setText(this._totalPrice, `${value} синапсов`);
	}
}

