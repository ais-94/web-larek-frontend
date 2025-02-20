//данные карточки
export interface IOrderLot{
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
  }

  //данные по сделанному заказу
  export interface IPostOrderLot {
    id: string;
    total: number;
  }

  //Интерфес данных карточки товара 
  export interface IProductItem {
    id: string;
    description?: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
  }

  export interface IProductsData {
    products: IProductItem[];
    preview: string | null;
    setProducts(products: IProductItem[]): void;
    getProducts(): IProductItem[];
    getProduct(id: string): IProductItem;
    savePreview(product: IProductItem): void;
  }
    
//Интерфейс формы заказа для ввода данных пользователя 
export interface IOrderForm {
payment: string;
address: string;
phone: string;
email: string;
total: number;
}

export type TFormErrors = Partial<Record<keyof IOrderLot, string>>;

export type TOrderInput = Pick<
IOrderLot,
'payment' | 'address' | 'email' | 'phone'
>;

//интерфейс данных пользователя
export interface IOrderData {
	formErrors: TFormErrors;
	order: IOrderLot;
	setOrderPayment(value: string): void;
	setOrderEmail(value: string): void;
	setOrderField(field: keyof TOrderInput, value: string): void;
	setOrderField(field: keyof IOrderLot, value: IOrderLot[keyof IOrderLot]): void;
	validateOrder(): boolean;
	clearOrder(): void;
}

  //Интерфейс отображения корзины
export interface IBasket {
basket: HTMLElement;
title: HTMLElement;
basketList: HTMLElement;
button: HTMLButtonElement;
basketPrice: HTMLElement;
headerBasketButton: HTMLButtonElement;
headerBasketCounter: HTMLElement;
}

//Интерфейс действий в корзине
export interface IBasketData {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
    clearBasket(): void;
    getTotalPrice(): string;
}

//Интерфейс для контактов
export interface IContacts {
formContacts: HTMLFormElement;
inputAll: HTMLInputElement[];
buttonSubmit: HTMLButtonElement;
formErrors: HTMLElement;
render(): HTMLElement;
}

//Интерфейс формы оповещения об оформления заказа
export interface ISuccess {
success: HTMLElement;
description: HTMLElement;
button: HTMLButtonElement;
render(total: number): HTMLElement;
}



