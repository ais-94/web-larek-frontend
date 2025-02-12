# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Проектирование архитектуры веб-приложения

** Код реализован на паттерне программирования MVP (Model-View-Presenter)

Модель (Model) - слой данных**

Представление (View) слой отображения, интерфейс для взаимодействия с пользователем**

Презентер (Presenter) слушает события в пользовательском интерфейсе и принимает решение, извлекает данные из модели**

### Классы с группировкой по слоям.

### Слой данных:

Класс EventEmitter

Модель данных: Брокер событий

Методы:

on - Установить обработчик на событие

off - Снять обработчик с события

emit - Инициировать событие с данными

onAll - Слушать все события

offAll - Сбросить все обработчики

-trigger - Сделать коллбек триггер, генерирующий событие при вызове


```
   interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```

Класс OrderModel - управляет формированием способов оплаты и адресов

Методы:

setOrderData(user: UserAPI): void - сохраняет данные формы заказа.

### Слой представления:

Класс Modal - управляет отображением модальных окон.

Методы:

open() - открыть окно.

close() - закрыть окно.

Класс BasketView управляет отображением корзины

Методы:  

renderHeaderBasketCounter отображает список товаров и общую стоимость

renderSumAllProducts - сохраняет и устанавливает сумму товаров в корзине


Класс Card – класс отображения карточки товара

Методы:

CardId - id товара.

CardTitle - название товара

CardImage – изображение товара

CardCategory - категорию товара

CardPrice – стоимость товара

### Слой презентера:
Класс ProductItem - обрабатывает данные товара
Интерфейс данных товара

```export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

Класс BasketModel работа с данными полученными от пользователя

```
interface IBasketModel {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
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
```

-Класс OrderForm - хранит данные полученные от пользователя

```
interface IOrderForm {
payment: string;
address: string;
phone: string;
email: string;
total: number;
}
```

Templates

```
const OrderSuccessTemplate = document.querySelector('#success') as HTMLTemplateElement;
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const OrderFormTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;

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
```

//Интерфейс отображения корзины

```
export interface IBasket {
basket: HTMLElement;
title: HTMLElement;
basketList: HTMLElement;
button: HTMLButtonElement;
basketPrice: HTMLElement;
headerBasketButton: HTMLButtonElement;
headerBasketCounter: HTMLElement;
}
```
