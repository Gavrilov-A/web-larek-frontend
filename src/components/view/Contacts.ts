import { IEvents } from '../base/events';
import { TFormContacts } from './../../types/index';
import { Form } from './Form';

export class Order extends Form<TFormContacts> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);        
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }
}