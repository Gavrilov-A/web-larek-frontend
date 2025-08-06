import { IProduct } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

export class ProductCard extends Component<IProduct> {
  protected _category: HTMLElement;
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;
  protected _description?: HTMLElement;
  protected _openButton?: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this._category = ensureElement<HTMLElement>(
      '.card__category',
      this.container
    ) as HTMLElement;
    this._title = ensureElement<HTMLElement>(
      '.card__title',
      this.container
    ) as HTMLElement;
    this._description = ensureElement<HTMLElement>(
      '.card__text',
      this.container
    ) as HTMLElement;
    this._image = ensureElement<HTMLImageElement>(
      '.card__image',
      this.container
    ) as HTMLImageElement;
    this._price = ensureElement<HTMLElement>(
      '.card__price',
      this.container
    ) as HTMLElement;
    this._openButton = ensureElement<HTMLButtonElement>(
      '.gallery__item',
      this.container
    ) as HTMLButtonElement;

    this._openButton.addEventListener('click', () => {
      events.emit('modalProduct: open');
    });
  }

  set category(value: string) {
    this.setText(this._category, value);
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  set image(value: string) {
    this.setImage(this._image, value);
  }

  set price(value: number | null) {
    if (value === null) {
      this._price.textContent = 'Бесценно';
    } else {
      this.setText(this._price, `синапсов ${value}`);
    }
  }
}
