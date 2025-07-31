import { ensureElement } from '../../utils/utils';
import { IEvents } from './../base/events';

export interface IProductCardView {
    content: HTMLElement;
}


export class ProductCardView{
  protected _category: HTMLSpanElement;
  protected _title: HTMLHeadingElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLSpanElement;
  protected _openButton: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents){
    this._category = ensureElement<HTMLSpanElement>('card__category')as HTMLSpanElement;
    this._title = ensureElement<HTMLSpanElement>('card__title')as HTMLHeadingElement;
    this._image = ensureElement<HTMLSpanElement>('card__image')as HTMLImageElement;
    this._price = ensureElement<HTMLSpanElement>('card__price')as HTMLSpanElement;
    this._openButton = ensureElement<HTMLSpanElement>('gallery__item')as HTMLButtonElement;

    this._openButton.addEventListener('click', ()=>{
      
    })
  }

  open(){
    
  }
}