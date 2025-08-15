import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";
import { IOrderResult } from "../../types";

interface ISuccessOrder {
    onClick: () => void;
}

export class FormSuccess extends Component<IOrderResult> {
    protected _close: HTMLElement;
    protected _total: HTMLElement;

    constructor(container: HTMLElement, order: ISuccessOrder) {
        super(container);
        this._total = ensureElement('.order-success__description', this.container) as HTMLElement;
        this._close = ensureElement('.order-success__close', this.container) as HTMLElement;

        if (order?.onClick) {
            this._close.addEventListener('click', order.onClick);
        }
    }

    set total(value: string){
        this.setText(this._total, `${value} синапсов`)
    }
}