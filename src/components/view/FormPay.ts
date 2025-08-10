import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export interface IFormPay {
  valid: boolean;
  inputValues: Record<string, string>; 
  error: Record<string, string>;
}

export class FormPay extends Component<IFormPay>{
  protected formName: string;
  protected _form: HTMLFormElement;
  protected buttonCard: HTMLButtonElement;
  protected buttonCash: HTMLButtonElement;
  protected input: HTMLInputElement;
  protected errors: Record<string, HTMLElement>;;
  protected buttonNext: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents){
    super(container);
    this.buttonCard = ensureElement('[name="card"]', this.container) as HTMLButtonElement;
    this.buttonCash = ensureElement('[name="cash"]', this.container) as HTMLButtonElement;
    this.input = ensureElement('.form__input', this.container) as HTMLInputElement;
    // this.error = ensureElement('.form__errors', this.container) as HTMLElement
    
    this.buttonNext = ensureElement('.order__button', this.container) as HTMLButtonElement;

    
		this.errors[this.input.name] = this._form.querySelector(`#${this.input.id}__errors`);
		
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.events.emit(`${this.formName}:submit`, this.getInputValues());
		});
		this._form.addEventListener('input', (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			const field = target.name;
			const value = target.value;
			this.events.emit(`${this.formName}:input`, { field, value });
		});
  }

protected getInputValues() {
		const valuesObject: Record<string, string> = {};
		valuesObject[this.input.name] = this.input.value;
		return valuesObject;
	}

	set inputValues(data: Record<string, string>) {
			this.input.value = data[this.input.name];
	}

	set error(data: { field: string; value: string; validInformation: string }) {
		if (data.validInformation) {
			this.showInputError(data.field, data.validInformation);
		} else {
			this.hideInputError(data.field);
		}
	}

	protected showInputError(field: string, errorMessage: string) {
		this._form[field].classList.add('popup__input_type_error');
		this.errors[field].textContent = errorMessage;
		this.errors[field].classList.add('popup__error_visible');
	}

	protected hideInputError(field: string) {
		this._form[field].classList.remove('popup__input_type_error');
		this.errors[field].classList.remove('popup__error_visible');
		this.errors[field].textContent = '';
	}

	set valid(isValid: boolean) {
		console.log({isValid})
		// this.submitButton.classList.toggle('popup__button_disabled', !isValid);
		// this.submitButton.disabled = !isValid;
	}

	get form() {
		return this._form;
	}

	close() {
		
		this._form.reset();
		this.hideInputError(this.input.name);
	}
}