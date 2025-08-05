import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

interface IPage {
  setCounter(value: number): void;
  setGalleryCard(items: HTMLElement[]): void;
  setLocked(value: boolean): void;
}

export class Page implements IPage {
  protected counter: HTMLElement;
  protected basket: HTMLButtonElement;
  protected galleryCard: HTMLElement;
  protected wrapper: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    this.container = container as HTMLElement;
    this.counter = container.querySelector('.header__basket-counter');
    this.galleryCard = container.querySelector('.catalog__items');
    this.basket = container.querySelector('.header__basket');

    this.basket.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  setCounter(value: number) {
    this.counter.textContent = String(value);
    // this.setText(this._counter, String(value));
  }

  setGalleryCard(items: HTMLElement[]) {
    this.galleryCard.replaceChildren(...items);
  }

  setLocked(value: boolean) {
    if (value) {
      this.wrapper.classList.add('page__wrapper_locked');
    } else {
      this.wrapper.classList.remove('page__wrapper_locked');
    }
  }
}