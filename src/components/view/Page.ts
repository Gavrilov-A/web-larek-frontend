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
  protected wrapper: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container)
    this.elementCounter = ensureElement('.header__basket-counter', this.container) as HTMLElement
    this.galleryCard = ensureElement('.gallery', this.container) as HTMLElement;
    this.buttonBasket = ensureElement('.header__basket', this.container) as HTMLButtonElement;
    // this.wrapper = ensureElement('.page__wrapper', this.container);

    this.buttonBasket.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  set counter (value: number) {
    this.setText(this.elementCounter, value);
  }

  set productList(items: HTMLElement[]) {
    this.galleryCard.replaceChildren(...items);
  }

  setLocked(value: boolean) {
    // if (value) {
    //   this.wrapper.classList.add('.page__wrapper_locked');
    // } else {
    //   this.wrapper.classList.remove('.page__wrapper_locked');
    // }
  }
}