import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { ISuccess, IAction } from '../types/index';

export class Success extends Component<ISuccess> {
	protected _close: HTMLElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, actions: IAction) {
		super(container);
		this._total = ensureElement('.order-success__description', container);
		this._close = ensureElement(
			'.order-success__close',
			container
		) as HTMLButtonElement;
		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	set total(value: string) {
		this.setText(this._total, `Списано ${value} синапсов`);
	}
}
