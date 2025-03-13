import { Form } from './common/Form';
import { IEvents } from './base/events';
import { IContactFormData } from '../types';
import { ensureElement } from '../utils/utils';
import { debounce } from 'lodash';

export class ContactForm extends Form<IContactFormData> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;
	protected Submitbutton: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		//	this.Submitbutton = container.querySelector('.button_submit');
		this.Submitbutton = ensureElement<HTMLButtonElement>(
			'.button_submit',
			this.container
		);
		this._email = container.querySelector(
			'input[name="email"]'
		) as HTMLInputElement;
		this._phone = container.querySelector(
			'input[name="phone"]'
		) as HTMLInputElement;

		events.emit('contacts:field:change', {
			field: 'email',
			value: this._email.value,
		});
		events.emit('contacts:field:change', {
			field: 'phone',
			value: this._phone.value,
		});

		const debouncedFunction = debounce((field: string, value: string) => {
			events.emit('contacts:field:change', { field, value });
			console.log('Я сработаю через 1 секунду');
		}, 10);

		this._email.addEventListener('input', () => {
			const value = this._email.value.trim();
			debouncedFunction('email', value);
			this.validation();
		});

		this._phone.addEventListener('input', () => {
			const value = this._phone.value.trim();
			debouncedFunction('phone', value);
			this.validation();
		});

		container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			if (this.validation) {
				const formData = {
					email: this._email.value.trim(),
					phone: this._phone.value.trim(),
				};
				events.emit('contacts:submit', formData);
			}
		});
	}

	validation() {
		const email = this._email.value;
		const phone = this._phone.value;
		const pattern = /^\S+@\S+\.\S+$/;
		const patterntel = /^((\+7|7|8)+([0-9]){10})$/;
		const errors: string[] = [];
		this.Submitbutton.disabled = true;
		if (!email) {
			errors.push('Необходимо указать email');
			this.Submitbutton.disabled = true;
		}
		if (!phone) {
			errors.push('Необходимо указать телефон');
			this.Submitbutton.disabled = true;
		} else if (!pattern.test(email)) {
			errors.push('Неправильно указан email');
			this.Submitbutton.disabled = true;
		} else if (!patterntel.test(phone)) {
			errors.push('Неправильно указан номер телефона');
			this.Submitbutton.disabled = true;
		}
		this.errors = errors.join('');
		if ((this.valid = errors.length === 0)) {
			this.Submitbutton.disabled = false;
		}
		return (this.valid = errors.length === 0);
	}

	get email(): string {
		return this._email.value;
	}

	set email(value: string) {
		this._email.value = value;
	}

	get phone(): string {
		return this._phone.value;
	}

	set phone(value: string) {
		this._phone.value = value;
	}
}
