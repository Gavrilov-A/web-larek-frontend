import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IPage {
  productList: HTMLElement[];
  counter: number;
}

export class Page extends Component<IPage> {
  protected elementCounter: HTMLElement;
  protected buttonBasket: HTMLButtonElement;
  protected galleryCard: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container)
    this.elementCounter = ensureElement('.header__basket-counter', this.container) as HTMLElement
    this.galleryCard = ensureElement('.gallery', this.container) as HTMLElement;
    this.buttonBasket = ensureElement('.header__basket', this.container) as HTMLButtonElement;

    this.buttonBasket.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  set counter(value: number) {
    if(value!==0){
      this.setText(this.elementCounter, value);
      this.events.emit('count:changed')
    } else {
      this.setText(this.elementCounter, 0);
      this.events.emit('count:changed')
    }
    
  }

  set productList(items: HTMLElement[]) {
    this.galleryCard.replaceChildren(...items);
    this.events.emit('list:changed')
  }

  setLocked(value: boolean) {
    if (value) {
      this.container.classList.add('page__wrapper_locked');
    } else {
      this.container.classList.remove('page__wrapper_locked');
    }
  }
}