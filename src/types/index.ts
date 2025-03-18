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
	getTotalPrice(): number;
	clearBasket(): void;
}

export interface IBasketItem {
	cardId: string;
	cardTotal: number;
}

export interface IOrderLot {
	id: string;
	items: IBasketItem[];
	total: number;
	payment?: string;
	address: string;
	email: string;
	phone: string;
}

export interface IUserData {
	email: string;
	phone: string;
	address: string;
}

export interface IOrderModel {
	order: IOrderLot;
	formData(data: Partial<IOrderLot>): void;
	setContactData(data: Partial<IUserData>): void;
	validationForm(): string[];
	getOrderData(): IOrderLot
}


export interface IProduct {
	id: string;
	title: string;
	category: string;
	price: number | null;
	image: string;
	description?: string;
}


export interface IBasket {
	id: string;
	title: string;
	price: number | null;
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

export interface IContactformData {
	email: string;
	phone: string;
	validation(): void;
}
