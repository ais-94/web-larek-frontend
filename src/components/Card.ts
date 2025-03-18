import { Component } from './base/Component';
import { IProduct } from '../types/index';
import { ensureElement } from '../utils/utils';

export class Card extends Component<IProduct> {
	protected _title: HTMLElement;
	protected _category?: HTMLElement;
	protected _price: HTMLElement;
	protected _image: HTMLImageElement;
	protected _colors: Record<string, string> = {
		'софт-скил': 'soft',
		другое: 'other',
		дополнительное: 'additional',
		кнопка: 'button',
		'хард-скил': 'hard',
	};

	constructor(container: HTMLElement, onClick?: () => void) {
		super(container);
		this._category = ensureElement('.card__category', this.container);
		this._title = ensureElement('.card__title', this.container);
		this._image = ensureElement(
			'.card__image',
			this.container
		) as HTMLImageElement;
		this._price = ensureElement('.card__price', this.container);

		if (onClick) {
			container.addEventListener('click', onClick);
		}
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category.className = `card__category card__category_${this._colors[value]}`;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this._title.textContent || '');
	}

	set price(value: string) {
		if (value === 'Бесценно') {
			this.setText(this._price, 'Бесценно');
		} else if (value === 'null') {
			this.setText(this._price, 'Бесценно');
		} else {
			this.setText(this._price, `${value} синапсов`);
		}
	}
}
