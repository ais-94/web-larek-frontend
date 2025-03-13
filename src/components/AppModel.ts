import { Model } from './base/Model';
import { IEvents } from './base/events';
import {
	IProduct,
	IBasket,
	IUserApi,
	IOrderLot,
	IBasketItemApi,
	IProductModel,
	IBasketModel,
	IOrderModel,
} from '../types';

export class AppModel
	extends Model<AppModel>
	implements IProductModel, IOrderModel, IBasketModel
{
	protected _cards: IProduct[] = [];
	protected _basket: IBasket[] = [];
	protected _order: IOrderLot = {
		total: 0,
		items: [],
		address: '',
		email: '',
		phone: '',
		id: '',
	};

	constructor(protected events: IEvents) {
		super({}, events);
	}

	get order(): IOrderLot {
		return this._order;
	}

	get products(): IProduct[] {
		return this._cards;
	}

	get basket(): IBasket[] {
		return this._basket;
	}

	setCards(products: IProduct[]) {
		this._cards = products;
		this.emitChanges('products:updated', this._cards);
	}

	TotalPrice(): string {
		const total = this._basket.reduce((number, card) => {
			const price = parseInt(card.price) * card.cardTotal;
			return number + price;
		}, 0);

		return `${total} синапсов`;
	}

	addCardToBasket(product: IProduct) {
		this._basket.push({
			id: product.id,
			title: product.title,
			price:
				product.price === 'Бесценно'
					? product.price
					: `${product.price} синапсов`,
			cardTotal: 1,
		});
		this.events.emit('basket:update', {
			items: this._basket,
			total: this.TotalPrice(),
		});
	}

	removeFromBasket(cardId: string) {
		this._basket = this._basket.filter((item) => item.id !== cardId);
		this.events.emit('basket:change');
	}

	clearBasket() {
		this._basket = [];
		this.events.emit('basket:change');
	}

	FormData(data: Partial<IOrderLot>) {
		this._order = { ...this._order, ...data };
		this.emitChanges('order:updated', this._order);
	}

	// валидация данных
	validationForm(): string[] {
		const errors: string[] = [];
		if (!this._order.email) {
			errors.push('Не указан Email');
		}
		if (!this._order.address) {
			errors.push('Не указан адрес');
		}

		if (!this._order.phone) {
			errors.push('Не указан номер телефона');
		}

		return errors;
	}

	setOrderPayment(payment: string) {
		this._order.payment = payment;
	}

	setOrderData(items: IBasketItemApi[]) {
		this._order.items = items.map((item) => ({
			cardId: String(item.cardId),
			cardTotal: item.cardTotal,
		}));
	}

	getOrderData(): IOrderLot {
		return {
			id: this._order.id,
			total: parseInt(this.TotalPrice()),
			items: this._basket.map((item) => ({
				cardId: item.id,
				cardTotal: item.cardTotal,
			})),
			payment: this._order.payment || 'card',
			address: this._order.address,
			phone: this._order.phone,
			email: this._order.email,
		};
	}

	setContactData(data: Partial<IUserApi>) {
		this._order = {
			...this._order,
			...data,
		};
		this.emitChanges('user:updated', this._order);
	}
}
