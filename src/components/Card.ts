//***
import { IProductItem } from './../types/index';
import { IEvents } from './base/events';
import { ensureElement, cloneTemplate } from '../utils/utils';


export interface ICard {
	render(data: IProductItem): HTMLElement;
}

export interface IClick {
	onClick: (event: MouseEvent) => void;
}

export class Card implements ICard {
	protected _card: HTMLElement;
	protected _category: HTMLElement;
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLElement;
	protected _colors = <Record<string, string>>{
		'софт-скил': 'soft',
		кнопка: 'button',
		'хард-скил': 'hard',
		другое: 'other',
		дополнительное: 'additional',
	};

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: IClick
	) {
		//super(container);
		this._card = template.content
			.querySelector('.card')
			.cloneNode(true) as HTMLElement;
		this._category = ensureElement(
			'.card__category',
			this._card
		) as HTMLElement;
		this._title = ensureElement('.card__title', this._card) as HTMLElement;
		this._image = ensureElement('.card__image', this._card) as HTMLImageElement;
		this._price = ensureElement('.card__price', this._card) as HTMLElement;

		if (actions?.onClick) {
			this._card.addEventListener('click', actions?.onClick);
		}
	}

	protected setText(element: HTMLElement, value: unknown): string {
		if (element) {
			return (element.textContent = String(value));
		}
	}

	set cardCategory(value: string) {
		this.setText(this._category, value);
		this._category.className = `card__category card__category_${this._colors[value]}`;
	}

	 setPrice(value: number | null): string {
		if (value === null) {
			return 'Бесценно';
		}
		return String(value) + ' синапсов';
	}

	render(data: IProductItem): HTMLElement {
		this._title.textContent = data.title;
		this._category.textContent = data.category;
		this.cardCategory = data.category;
		this._price.textContent = this.setPrice(data.price);
		this._image.src = data.image;
		this._image.alt = this._title.textContent;
		return this._card;
	}
}
