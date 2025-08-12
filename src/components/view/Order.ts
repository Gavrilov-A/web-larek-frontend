import { IEvents } from '../base/events';
import { TFormOrder } from './../../types/index';
import { FormOrder } from './FormOrder';

export class Order extends FormOrder<TFormOrder> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set payment(value: string) {
        (this.container.elements.namedItem('payment') as HTMLInputElement).value = value;
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}