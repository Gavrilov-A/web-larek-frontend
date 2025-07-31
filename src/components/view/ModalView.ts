import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

// Интерфейс для данных, которые передаются в render
export interface IModalData {
    content: HTMLElement;
}

// Вью модального окна
export class ModalView {
    protected _container: HTMLElement;
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        this._container = container;

        this._closeButton = ensureElement<HTMLButtonElement>(
            '.modal__close',
            this._container
        );
        this._content = ensureElement<HTMLElement>('.modal__content', this._container);

        // Закрытие по крестику
        this._closeButton.addEventListener('click', this.close.bind(this));

        // Закрытие по клику на фон (но не по контенту)
        this._container.addEventListener('click', (event) => {
            if (event.target === this._container) {
                this.close();
            }
        });

        // Предотвращение закрытия при клике внутри контента
        this._content.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

    // Установка контента
    set content(value: HTMLElement) {
        if (value) {
            this._content.replaceChildren(value);
        } else {
            this._content.replaceChildren();
        }
    }

    // Открытие модального окна
    open(): void {
        this._container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    // Закрытие модального окна
    close(): void {
        this._container.classList.remove('modal_active');
        this.content = null; // Очистка контента
        this.events.emit('modal:close');
    }

    // Рендер и открытие модалки
    render(data: IModalData): HTMLElement {
        this.content = data.content;
        this.open();
        return this._container;
    }
}