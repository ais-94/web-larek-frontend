
import { Component } from './base/Component';
import { IBasket } from '../types/index';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export class BasketCards extends Component<IBasket> {
	protected _index: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLElement;
	protected _title: HTMLElement;
		protected _item: IBasket;


	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this._index = ensureElement('.basket__item-index', this.container) as HTMLElement;
		this._title = ensureElement('.card__title', this.container) as HTMLElement;
		this._price = ensureElement('.card__price', this.container) as HTMLElement;
		this._button = ensureElement('.basket__item-delete', this.container) as HTMLButtonElement;
		this._button.addEventListener('click', () => {
			events.emit('card:remove', this._item);
		});
	}

	set index(value: number) {
		this.setText(this._index, value);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: string) {
		this.setText(this._price, value);
	}

	renderCard(item: IBasket): void {
		this._item = item;
		this.title = item.title;
		this.price = item.price;
	}
}
