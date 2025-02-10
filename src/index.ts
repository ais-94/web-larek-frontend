import './scss/styles.scss';
/*
interface IBasketModel {
    items: Map<string, number>;
    add[id: string]: void;
    remove[id: string]: void;
}

interface IEventEmitter {
    emit: (event: string, data: unknown) => void;
}

class BasketModel implements IBasketModel {
    items: Map<string, number> = new Map[];

    add[id: string]: void {
        if (!this.items.has(id)) this.items.set((id, 0)); //создаем новый
        this.items.set(id, this.items.get(id)! + 1); //прибавляем количество
    }
    remove[id: string]: void {
        if (!this.items.has(id)) return; //если нет, возвращает ничего
       if (this.items.get(id)! > 0) {
        this.items.set(id, this.items.get(id)! - 1); //уменьшаем
        if (this.items.get(id) === 0) this.items.delete(id); //
       }
    }
    }

*/

/*

## Интерфейсы

interface IEventEmitter {
    emit: (event: string, data: unknown) => void;
}

//Интерфес данных товара
export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

//Интерфейс формы заказа  
export interface IOrderForm {
payment: string;
address: string;
phone: string;
email: string;
total: string | number;
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
interface IBasketModel {
    items: Map<string, number>;
    add[id: string]: void;
    remove[id: string]: void;
}

//Интерфейс для конттов
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
}*/