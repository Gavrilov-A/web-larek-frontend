import { IEvents } from '../base/events';
import { TFormOrder } from './../../types/index';
import { Form } from './Form';

export class Order extends Form<TFormOrder> {
     private _paymentButtons: NodeListOf<HTMLButtonElement>;
    private _selectedPayment: string | null = null;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);    
        // Получаем кнопки оплаты
        this._paymentButtons = container.querySelectorAll('.button_alt');
        
        // Добавляем обработчики на кнопки оплаты
        this._paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                this._handlePaymentSelect(button.name);
            });
        });
    }

    private _handlePaymentSelect(paymentMethod: string) {
        // Сохраняем выбранный метод оплаты
        this._selectedPayment = paymentMethod;
        
        // Обновляем состояние формы
        this.events.emit(`${this.container.name}.payment:change`, {
            field: 'payment',
            value: paymentMethod
        });
    }

    get payment(): string | null {
        return this._selectedPayment;
    }    

    set payment(value: string) {
        (this.container.elements.namedItem('payment') as HTMLInputElement).value = value;
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }

}