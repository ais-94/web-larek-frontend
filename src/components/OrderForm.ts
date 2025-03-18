import { Form } from './common/Form';
import { IEvents } from './base/events';
import { IOrderForm } from '../types';
import { ensureElement } from '../utils/utils';

interface IOrderFormData {
	payment: string;
	address: string;
}

export class OrderForm extends Form<IOrderFormData> implements IOrderForm {
	protected _buttons: HTMLButtonElement[];
	protected _address: HTMLInputElement;
	protected _paymentButtons: HTMLButtonElement[];

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this._buttons = Array.from(
			container.querySelectorAll('.button_alt')
		) as HTMLButtonElement[];
		this._paymentButtons = Array.from(
			container.querySelectorAll('.button_alt')
		) as HTMLButtonElement[];

		this._address = ensureElement(
			'.form__input[name=address]',
			this.container
		) as HTMLInputElement;

		this._paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				this._paymentButtons.forEach((btn) =>
					btn.classList.remove('button_alt-active')
				);
				button.classList.add('button_alt-active');
				events.emit('payment:change', button);
				this.validation();
			});
		});

		this._address.addEventListener('input', () => {
			events.emit('order:field:change', {
				field: 'address',
				value: this._address.value,
			});
			this.validation();
		});
	}

	validation() {
		const address = this._address.value;
		const payment = this._buttons.find((btn) =>
			btn.classList.contains('button_alt-active')
		)?.name;
		//this._submit.disabled = true;
		const errors: string[] = [];
		if (!address) {
			errors.push('Укажите адрес');
			//this.formErrors.textContent = 'Укажите адрес'
			this._submit.disabled = true;
		}
		if (!payment) {
			errors.push('Выберите способ оплаты');
			this._submit.disabled = true;
		}

		this.valid = errors.length === 0;
		this.errors = errors.join('; ');

		if (this.valid) {
			this._submit.disabled = false;
		}

		}

	get payment(): string {
		return (
			this._buttons.find((btn) => btn.classList.contains('button_alt-active'))
				?.name || ''
		);
	}

	set payment(value: string) {
		this._buttons.forEach((btn) => {
			btn.classList.toggle('button_alt-active', btn.name === value);
		});
	}

	get address(): string {
		return this._address.value;
	}

	set address(value: string) {
		this._address.value = value;
	}
	
}
