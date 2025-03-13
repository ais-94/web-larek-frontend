import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';
import { IPage } from '../types/index';



export class Page extends Component<IPage> {
	protected _counter: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLButtonElement;

	constructor(container: HTMLElement, private events: IEvents) {
		super(container);

		this._counter = ensureElement('.header__basket-counter') as HTMLElement;
		this._wrapper = ensureElement('.page__wrapper') as HTMLElement;
		this._basket = ensureElement('.header__basket') as HTMLButtonElement;

		//открыть корзину
		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	//вывести все карточки
	renderCatalog(cards: HTMLElement[]): void {
		this.container.replaceChildren(...cards);
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	}
}
