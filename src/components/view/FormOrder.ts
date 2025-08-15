import { TFormOrder } from "../../types";
import { IEvents } from "../base/events";
import { Form } from "./Form";


export class FormOrder extends Form<TFormOrder> {
	protected paymentButtons: NodeListOf<HTMLButtonElement>;
	protected selectedPayment: string ;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	
		this.paymentButtons = container.querySelectorAll('.button_alt');

		this.paymentButtons.forEach((button) => {		
			button.classList.remove('button-active');
		});

		this.paymentButtons.forEach((button) => {		
			button.addEventListener('click', () => {
				this._handlePaymentSelect(button.name);
				this.paymentButtons.forEach((btn) => {
					btn.classList.remove('button-active');
				});
				button.classList.add('button-active');
			});
		});
	}

	protected _handlePaymentSelect(paymentMethod: string) {
		// Сохраняем выбранный метод оплаты
		this.selectedPayment = paymentMethod;

		// Обновляем состояние формы
		this.events.emit(`${this.container.name}.payment:change`, {
			field: 'payment',
			value: paymentMethod,
		});
	}

	get payment(): string | null {
		return this.selectedPayment;
	}

	set payment(value: string) {
		this.selectedPayment = value; 
        this.events.emit(`${this.container.name}.payment:change`, {
            field: 'payment',
            value: value,
        });
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	reset() {
	this.paymentButtons.forEach((btn) => {
		btn.classList.remove('button-active');
	});
	this.selectedPayment = null;

	const addressInput = this.container.elements.namedItem('address') as HTMLInputElement;
	if (addressInput) addressInput.value = '';
}
}
