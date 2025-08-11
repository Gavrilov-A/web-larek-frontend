import { IOrder, IOrderData } from '../../types';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { OrderData } from '../modelData/OrderData';

export interface IFormOrder{
	valid: boolean;
	inputValues: Record<string, string>;
	error: Record<string, string>;
}

export class FormOrder extends Component<IFormOrder> {
	protected paymentButtons: NodeListOf<HTMLButtonElement>;
	protected input: HTMLInputElement;
	protected _error: HTMLElement;
	protected submitButton: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this.paymentButtons = this.container.querySelectorAll('.order__buttons');
		this.input = ensureElement(
			'.form__input',
			this.container
		) as HTMLInputElement;
		this._error = ensureElement('.form__errors', this.container);
		this.submitButton = ensureElement(
			'.order__button',
			this.container
		) as HTMLButtonElement;

	}}

    // private initEvents(data: IOrderData): void {
    //     // Ввод адреса
    //     this.input.addEventListener('input', () => {
    //         const value = this.input.value.trim();
    //         data.order.address = value;
    //         this.validate();
    //     });

    //     // Клик по кнопкам оплаты
    //     this.paymentButtons.forEach((button) => {
    //         button.addEventListener('click', () => {
    //             // Сбрасываем активный стиль
    //             this.paymentButtons.forEach(btn =>
    //                 btn.classList.remove('button_active')
    //             );
    //             button.classList.add('button_active');

    //             // Сохраняем способ оплаты в модели
    //             data.order.payment = button.name as 'card' | 'cash';
    //             this.validate();
    //         });
    //     });

// 	protected getInputValues() {
// 		const valuesObject: Record<string, string> = {};
//         this.paymentButtons.forEach((button) => {
//             valuesObject[button.name] = button.textContent;
//         })
		
// 		valuesObject[this.input.name] = this.input.value;
// 		return valuesObject;
// 	}

// 	set inputValues(data: Record<string, string>) {
// 		this.input.value = data[this.input.name];
// 	}

// 	set error(data: { field: string; value: string; validInformation: string }) {
// 		if (data.validInformation) {
// 			this.showInputError(data.field, data.validInformation);
// 		} else {
// 			this.hideInputError(data.field);
// 		}
// 	}

// 	protected showInputError(field: string, errorMessage: string) {
// 		this._form[field].classList.add('popup__input_type_error');
// 		this.errors[field].textContent = errorMessage;
// 		this.errors[field].classList.add('popup__error_visible');
// 	}

// 	protected hideInputError(field: string) {
// 		this._form[field].classList.remove('popup__input_type_error');
// 		this.errors[field].classList.remove('popup__error_visible');
// 		this.errors[field].textContent = '';
// 	}

// 	set valid(isValid: boolean) {
// 		console.log({ isValid });
// 		// this.submitButton.classList.toggle('popup__button_disabled', !isValid);
// 		// this.submitButton.disabled = !isValid;
// 	}

// 	get form() {
// 		return this._form;
// 	}

// 	close() {
// 		this._form.reset();
// 		this.hideInputError(this.input.name);
// 	}
// }

// // export class FormOrder {
// //     private form: HTMLFormElement;
// //     private addressInput: HTMLInputElement;
// //     private paymentButtons: HTMLButtonElement[];
// //     private submitButton: HTMLButtonElement;
// //     private errorElement: HTMLElement;

// //     private data: IOrderData;
// //     private events: IEvents;

// //     constructor(container: HTMLElement, data: IOrderData, events: IEvents) {
// //         this.data = data;
// //         this.events = events;

// //         this.render(container);
// //         this.initEvents();
// //     }

// //     private render(container: HTMLElement): void {
// //         const template = document.getElementById('order') as HTMLTemplateElement;
// //         const content = document.importNode(template.content, true);
// //         this.form = content.querySelector('form')! as HTMLFormElement;

// //         this.addressInput = this.form.querySelector('input[name="address"]') as HTMLInputElement;
// //         this.submitButton = this.form.querySelector('button[type="submit"]') as HTMLButtonElement;
// //         this.errorElement = this.form.querySelector('.form__errors') as HTMLElement;

// //         // Преобразуем NodeList в массив кнопок
// //         this.paymentButtons = Array.from(
// //             this.form.querySelectorAll('.order__buttons button')
// //         ) as HTMLButtonElement[];

// //         container.appendChild(content);
// //     }

// //     private initEvents(): void {
// //         // Ввод адреса
// //         this.addressInput.addEventListener('input', () => {
// //             const value = this.addressInput.value.trim();
// //             this.data.order.address = value;
// //             this.validate();
// //         });

// //         // Клик по кнопкам оплаты
// //         this.paymentButtons.forEach((button) => {
// //             button.addEventListener('click', () => {
// //                 // Сбрасываем активный стиль
// //                 this.paymentButtons.forEach(btn =>
// //                     btn.classList.remove('button_active')
// //                 );
// //                 button.classList.add('button_active');

// //                 // Сохраняем способ оплаты в модели
// //                 this.data.order.payment = button.name as 'card' | 'cash';
// //                 this.validate();
// //             });
// //         });

// //         // Отправка формы
// //         this.form.addEventListener('submit', (e) => {
// //             e.preventDefault();
// //             if (this.validate()) {
// //                 this.events.emit('order:next'); // Можно перейти к форме контактов
// //             }
// //         });
// //     }

// //     // Простая валидация: адрес не пустой, способ оплаты выбран
// //     private validate(): boolean {
// //         const address = this.data.order.address?.trim();
// //         const payment = this.data.order.payment;

// //         const isAddressValid = !!address;
// //         const isPaymentValid = !!payment;

// //         if (isAddressValid && isPaymentValid) {
// //             this.submitButton.disabled = false;
// //             this.errorElement.textContent = '';
// //             return true;
// //         } else {
// //             this.submitButton.disabled = true;
// //             this.errorElement.textContent = 'Заполните все поля';
// //             return false;
// //         }
// //     }

// //     // Опционально: сброс формы
// //     public reset(): void {
// //         this.addressInput.value = '';
// //         this.data.order.address = '';
// //         this.data.order.payment = '';

// //         this.paymentButtons.forEach(btn => {
// //             btn.classList.remove('button_active');
// //         });

// //         this.submitButton.disabled = true;
// //         this.errorElement.textContent = '';
// //     }
// // }

// //
