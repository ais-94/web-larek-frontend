import { Model } from './base/Model';
import { IEvents } from './base/events';
import {
	IProduct,
	IBasket,
	IUserData,
	IOrderLot,
	IBasketItem,
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

	//проверка наличии карточки в корзине
	isInBasket(card: IProduct) {
		return this.basket.some((item) => item.id === card.id);
	}

	setCards(products: IProduct[]) {
		this._cards = products;
		this.emitChanges('products:updated', this._cards);
	}

	getTotalPrice() {
		const total = this._basket.reduce((number, card) => {
			const price = card.price * card.cardTotal;
			return number + price;
		}, 0);

		return total;
	}

	addCardToBasket(product: IProduct) {
		this._basket.push({
			id: product.id,
			title: product.title,
			price: product.price,
			cardTotal: 1,
		});
		this.events.emit('basket:update', {
			items: this._basket,
			total: this.getTotalPrice(),
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

	formData(data: Partial<IOrderLot>) {
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

	setOrderData(items: IBasketItem[]) {
		this._order.items = items.map((item) => ({
			cardId: String(item.cardId),
			cardTotal: item.cardTotal,
		}));
	}

	getOrderData(): IOrderLot {
		return {
			id: this._order.id,
			total: this.getTotalPrice(),
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

	preparedOrder(order: IOrderLot) {
		return {
			address: order.address,
			phone: order.phone,
			email: order.email,
			payment: order.payment,
			total: order.total,
			items: order.items.map((item) => item.cardId),
			id: order.id,
		};
	}

	setContactData(data: Partial<IUserData>) {
		this._order = {
			...this._order,
			...data,
		};
		this.emitChanges('user:updated', this._order);
	}
}
