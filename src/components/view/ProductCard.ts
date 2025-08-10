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
  protected _description: HTMLElement;
  protected openButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.openButton = this.container.querySelector('.gallery__item')    
    this._category = ensureElement('.card__category', this.container) as HTMLElement;
    this._title = ensureElement('.card__title', this.container) as HTMLElement;
    this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
    this._price = ensureElement('.card__price', this.container) as HTMLElement;
    if(this.openButton){
      this.openButton.addEventListener('click', ()=> this.events.emit('product:open', {id: this.itemId}))
    } else {
      this.container.addEventListener('click', ()=> this.events.emit('product:open', {id: this.itemId}))
    }
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
  protected button: HTMLButtonElement;
  constructor(container: HTMLElement, protected events: IEvents){
    super(container, events)
    this.button = ensureElement('.button', this.container) as HTMLButtonElement;
    
  }
  set description(value: string) {
    this.setText(this._description, value);
  }

  buttonStatus(isInBasket: boolean){
    if (isInBasket) {
      this.button.textContent = 'Удалить из корзины';
      this.button.addEventListener('click',() => {
        this.events.emit('product:removeBasket', { id: this.itemId });
      });
    } else {
      this.button.textContent = 'В корзину';
      this.button.addEventListener('click',() => {
        this.events.emit('product:addBasket', { id: this.itemId });
      });
    }

  } 
}