import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

interface IPage {
  counter: number;
  galleryCard: HTMLElement[];
  locked: boolean;
}

export class Page implements IPage {
  protected _counter: HTMLElement;
  protected _basket: HTMLElement;
  protected _galleryCard: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _container: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    this._container = container as HTMLElement
    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._galleryCard = ensureElement<HTMLElement>('.catalog__items');
    this._basket = ensureElement<HTMLElement>('.header__basket');

    this._basket.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  set counter(value: number) {
    this._counter.textContent = String(value);
    // this.setText(this._counter, String(value));
  }

  set galleryCard(items: HTMLElement[]) {
    this._galleryCard.replaceChildren(...items);
  }

  set locked(value: boolean) {
    if (value) {
      this._wrapper.classList.add('page__wrapper_locked');
    } else {
      this._wrapper.classList.remove('page__wrapper_locked');
    }
  }
}