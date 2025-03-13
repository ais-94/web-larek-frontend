export interface IApiProductModel {
	getCardList(): Promise<IProduct[]>;
	createOrder: (order: IOrderLot) => Promise<IOrder>;
}

export interface IProductModel {
	products: IProduct[];
	setCards(products: IProduct[]): void;
}

export interface IBasketModel {
	basket: IBasket[];
	addCardToBasket(product: IProduct): void;
	removeFromBasket(cardId: string): void;
	TotalPrice(): string;
	clearBasket(): void;
}

export interface IOrderLot {
	id: string;
	items: IBasketItemApi[];
	total: number | null;
	payment?: string;
	address: string;
	email: string;
	phone: string;
}

export interface IUserApi {
	email: string;
	phone: string;
	address: string;
}

export interface IOrderModel {
	order: IOrderLot;
	FormData(data: Partial<IOrderLot>): void;
	setContactData(data: Partial<IUserApi>): void;
	validationForm(): string[];
	getOrderData(): IOrderLot;
}

export interface IProductItem {
	id: string;
	title: string;
	description: string;
	category: string;
	price: number | null;
	image: string;
}

export interface IProduct {
	id: string;
	title: string;
	category: string;
	price: string;
	image: string;
	description?: string;
}

export interface IBasketItemApi {
	cardId: string;
	cardTotal: number;
}
export interface IBasket {
	id: string;
	title: string;
	price: string;
	cardTotal: number;
}

export interface IOrder {
	id: string;
	items: IBasket[];
	total: string;
}

export interface IModalData {
	content: HTMLElement;
	handleEscUp: (event: KeyboardEvent) => void;
}

export interface Form {
	validateForm(): boolean;
	getData(): Record<string, string>;
	render(): HTMLElement;
}

export interface IOrderForm {
	address: string;
	payment: string;
	errors: string;
	valid: boolean;
	validation(): void;
}

export interface ISuccess {
	total: string;
}

export interface IPage {
	counter: number;
	locked: boolean;
}

export interface IAction {
	onClick: () => void;
}

export interface IContactFormData {
	email: string;
	phone: string;
	validation(): void;
}
