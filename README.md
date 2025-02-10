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
}