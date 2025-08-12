import { IOrder, IOrderData } from '../../types';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { OrderData } from '../modelData/OrderData';

export interface IFormOrder {
    valid: boolean;
    inputValues: Record<string, string>;
    errors: string[]; 
}

export class FormOrder extends Component<IFormOrder> {
    protected paymentButtons: NodeListOf<HTMLButtonElement>;
    protected addressInput: HTMLInputElement
    protected _error: HTMLElement;
    protected submitButton: HTMLButtonElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);
        this.paymentButtons = this.container.querySelectorAll('.button');
        this.addressInput = this.container.querySelector('.form__input');
        this._error = ensureElement('.form__errors', this.container);
        this.submitButton = ensureElement(
            '.order__button',
            this.container
        ) as HTMLButtonElement;

        this.paymentButtons.forEach(button => {
            button.addEventListener('click', ()=>{
                const field = 'payment';
                const value = button.name;
                this.events.emit(`address:input`, { field, value });
            })
        })

        this.container.addEventListener('input', (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.events.emit('address:input', { field, value });
        });

        this.container.addEventListener('submit', (evt: Event) => {
            evt.preventDefault();
            this.events.emit(`${this.container.name}:submit`, this.getInputValues());
        });

    }

    protected getInputValues() {
		const valuesObject: Record<string, string> = {};
	    valuesObject[this.addressInput.name] = this.addressInput.value;
        this.paymentButtons.forEach(item =>{
            valuesObject[item.name] = item.name
        })
        
		return valuesObject;
	}    

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set errors(value: string) {
        this.setText(this._error, value);
    }


}

