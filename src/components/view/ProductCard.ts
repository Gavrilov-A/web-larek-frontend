import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export interface IProductCard {
    content: HTMLElement;
}

export class ProductCard {
  protected category: HTMLSpanElement;
  protected title: HTMLHeadingElement;
  protected image: HTMLImageElement;
  protected price: HTMLSpanElement;
  protected openButton: HTMLButtonElement;

  constructor(template: HTMLElement, protected events: IEvents){
    this.category = ensureElement<HTMLSpanElement>('card__category')as HTMLSpanElement;
    this.title = ensureElement<HTMLSpanElement>('card__title')as HTMLHeadingElement;
    this.image = ensureElement<HTMLSpanElement>('card__image')as HTMLImageElement;
    this.price = ensureElement<HTMLSpanElement>('card__price')as HTMLSpanElement;
    this.openButton = ensureElement<HTMLSpanElement>('gallery__item')as HTMLButtonElement;

    this.openButton.addEventListener('click', ()=>{
      
    })
  }

  open(){
    
  }
}