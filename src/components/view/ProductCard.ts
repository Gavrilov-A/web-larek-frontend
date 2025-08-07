import { IProduct } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

export class ProductCard extends Component<IProduct> {
  protected itemId: string;
  protected _category: HTMLElement;
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;
  protected _description: HTMLElement | null;
  protected openButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.openButton = ensureElement('.gallery__item', this.container) as HTMLButtonElement;
    this._category = ensureElement('.card__category', this.container) as HTMLElement;
    this._title = ensureElement('.card__title', this.container) as HTMLElement;
    this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
    this._price = ensureElement('.card__price', this.container) as HTMLElement;

    this.openButton.addEventListener('click', ()=> this.events.emit('modalProduct: open', {id: this.itemId}))

  }

  set id(value: string){
    this.itemId = value;
  }

  set category(value: string) {
    this.setText(this._category, value);
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set image(value: string) {
    this.setImage(this._image, value);
  }

  set price(value: number | null) {
    if (value === null) {
      this._price.textContent = 'Бесценно';
    } else {
      this.setText(this._price, `${value} синапсов`);
    }
  }

}

export class ProductCardPreview extends ProductCard{
  protected _description: HTMLElement;
  protected addBasketButton: HTMLButtonElement;
  constructor(container: HTMLElement, protected events: IEvents){
    super(container, events)
    this.addBasketButton = ensureElement('.button', this.container) as HTMLButtonElement;

    this.addBasketButton.addEventListener('click', ()=> {
      events.emit('basket: add')
    })
    
  }
  set description(value: string) {
    this.setText(this._description, value);
  }
}