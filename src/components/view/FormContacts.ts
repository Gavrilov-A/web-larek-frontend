import { TFormContacts } from '../../types';
import { IEvents } from '../base/events';
import { Form } from './Form';

export class FormContacts extends Form<TFormContacts> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	reset() {
		const emailInput = this.container.elements.namedItem(
			'email'
		) as HTMLInputElement;
		if (emailInput) emailInput.value = '';

		const phoneInput = this.container.elements.namedItem(
			'phone'
		) as HTMLInputElement;
		if (phoneInput) phoneInput.value = '';
	}
}
