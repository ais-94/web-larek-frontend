import { Component } from '../base/Component';
import { createElement, ensureElement } from '../../utils/utils';
import { IBasket } from '../../types/index';
import { IEvents } from '../base/events';

export class Basket extends Component<IBasket[]> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _cardTemplate: HTMLTemplateElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._list = ensureElement('.basket__list', this.container);
		this._button = ensureElement(
			'.basket__button',
			this.container
		) as HTMLButtonElement;
		this._total = ensureElement('.basket__price', this.container);
		this._cardTemplate = ensureElement('#card-basket') as HTMLTemplateElement;

		this._button.disabled = true;

		this._button.addEventListener('click', () => {
			events.emit('order:open');
		});
	}

	renderBasket(items: HTMLElement[], total: string): void {
		this.setText(this._total, total);
		if (items.length) {
			this._list.replaceChildren(...items);
			this._button.disabled = false;
		} else {
			this._list.replaceChildren(
				createElement<HTMLElement>('p', { textContent: 'Корзина пуста' })
			);
			this._button.disabled = true;
		}
	}
}
