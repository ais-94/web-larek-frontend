import { Card } from './Card';
import { IProduct } from '../types/index';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export class CardInfoView extends Card {
	protected _text: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this._text = ensureElement('.card__text', this.container);
		this._button = ensureElement<HTMLButtonElement>(
			'.card__button',
			this.container
		);

		this._button.addEventListener('click', () => {
			events.emit('card:add', this.data);
		});
	}

	set text(value: string) {
		this.setText(this._text, value);
	}

	//Блокировать кнопку покупки при отсутвии цены
	set button(value: string) {
		if (value === 'Бесценно'||'null') {
			this._button.disabled = true;
		} else {
			this._button.disabled = false;
		}
	}

	private data: IProduct;

	renderCard(card: IProduct, isInBasket: boolean): void {
		this.data = card;
		this.title = card.title;
		this.image = card.image;
		this.text = card.description || '';
		this.price = String(card.price);
		this.category = card.category;

		//Блокировать кнопку покупки при отсутвии цены
		if (card.price === null) {
			this._button.disabled = true;
		} 
		else if (card.price === null) {
			this._button.disabled = true;
		}
		else if (isInBasket) {
			this._button.disabled = true;
			this._button.textContent = 'Добавлено';
		}
		else {
			this._button.disabled = false;
		}
	}
}
