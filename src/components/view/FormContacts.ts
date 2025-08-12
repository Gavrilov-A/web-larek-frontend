// import { IOrder, IOrderData } from '../../types';
// import { ensureAllElements, ensureElement } from '../../utils/utils';
// import { Component } from '../base/Component';
// import { IEvents } from '../base/events';
// import { OrderData } from '../modelData/OrderData';

// export interface IFormOrder {
//     valid: boolean;
//     errors: string[];
// }

// export class FormOrder extends Component<IFormOrder> {
//     protected _errors: HTMLElement;
//     protected submitButton: HTMLButtonElement;

//     constructor(protected container: HTMLFormElement, protected events: IEvents) {
//         super(container);
//         this._errors = ensureElement('.form__errors', this.container);
//         this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);

//         this.container.addEventListener('input', (e: Event) => {
//             const target = e.target as HTMLInputElement;
//             const field = target.name as keyof T;
//             const value = target.value;
//             this.onInputChange(field, value);
//         });

//         this.container.addEventListener('submit', (e: Event) => {
//             e.preventDefault();
//             this.events.emit(`${this.container.name}:submit`);
//         });

//     }

//     protected onInputChange(field: keyof T, value: string) {
//         this.events.emit(`${this.container.name}.${String(field)}:change`, {
//             field,
//             value
//         });
//     }

//     set valid(value: boolean) {
//         this.submitButton.disabled = !value;
//     }

//     set errors(value: string) {
//         this.setText(this._errors, value);
//     }

//    render(data: Partial<T> & IFormOrder) {
//         const {valid, errors, ...inputs} = data;
//         super.render({valid, errors});
//         Object.assign(this, inputs);
//         return this.container;
//     }
// }

