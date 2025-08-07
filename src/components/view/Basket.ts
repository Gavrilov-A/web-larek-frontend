import { ensureAllElements } from "../../utils/utils";
import { IEvents } from "../base/events";

export class BasketItemView {
    protected count: HTMLSpanElement;
    protected title: HTMLSpanElement;
    protected price: HTMLSpanElement;
    protected deleteButton: HTMLButtonElement;

    constructor(protected container: HTMLElement, protected events: IEvents){
        this.count = container.querySelector('basket__item-index');
        this.title = container.querySelector('card__title');
        this.price = container.querySelector('card__price');
        this.deleteButton = container.querySelector('basket__item-delete');
        this.deleteButton.addEventListener('click', ()=>{
        })
    }

    set item(value: HTMLElement){
      
    }

}

export class BasketView {
    protected item: HTMLLIElement
    protected list: [];
    protected title: HTMLSpanElement;
    protected totalPrice: HTMLSpanElement;
    protected button: HTMLButtonElement;

    constructor(protected container: HTMLElement, protected events: IEvents){
        
    }


}

