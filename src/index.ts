import './scss/styles.scss';

const OrderSuccessTemplate = document.querySelector('#success') as HTMLTemplateElement;
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const OrderFormTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;

import { CDN_URL, API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IEvents, EventEmitter } from "./components/base/events";
import { Card } from './components/Card';
import { IProductItem } from './types';
import { AppModel } from './components/AppModel';
import { DataModel } from './components/IDataModel';

const api = new AppModel(CDN_URL, API_URL);
const events = new EventEmitter();
const dataModel = new DataModel(events);

// данные с сервера
api.getListProductCard()
.then(function (data: IProductItem[]) {
  dataModel.productCards = data;
  console.log(dataModel.productCards)
})
.catch(error => console.log(error))

//отображение всех карточек на странице
events.on('productCards:receive', () => {
    dataModel.productCards.forEach(item => {
      const card = new Card(cardCatalogTemplate, events, { onClick: () => events.emit('card:select', item) });
      ensureElement<HTMLElement>('.gallery').prepend(card.render(item));
    });
  });

  