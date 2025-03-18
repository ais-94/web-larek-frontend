import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { webLarekApi } from './components/WebLarekApi';
import { cloneTemplate, ensureElement } from './utils/utils';
import { AppModel } from './components/AppModel';
import { Page } from './components/Page';
import { Card } from './components/Card';
import { BasketCards } from './components/BasketCards';
import { CardInfoView } from './components/CardInfoView';
import { Modal } from './components/common/Modal';
import { EventEmitter } from './components/base/events';
import { IProduct, IBasket, IOrder } from './types/index';
import { Basket } from './components/common/Basket';
import { OrderForm } from './components/OrderForm';
import { ContactForm } from './components/ContactForm';
import { Success as SuccessModal } from './components/Success';

// шаблоны
const BasketCardsTemplate = ensureElement(
	'#card-basket'
) as HTMLTemplateElement;
const basketTemplate = ensureElement('#basket') as HTMLTemplateElement;
const cardCatalogTemplate = ensureElement(
	'#card-catalog'
) as HTMLTemplateElement;
const cardModalTemplate = ensureElement('#card-preview') as HTMLTemplateElement;
const modalContainer = ensureElement('#modal-container') as HTMLElement;
const successTemplate = ensureElement('#success') as HTMLTemplateElement;
const contactTemplate = ensureElement('#contacts') as HTMLTemplateElement;
const orderTemplate = ensureElement('#order') as HTMLTemplateElement;

const events = new EventEmitter();
const modal = new Modal(modalContainer, events);

const basketModal = cloneTemplate(basketTemplate);
const basket = new Basket(basketModal, events);

const api = new webLarekApi(API_URL);
const appModel = new AppModel(events);
const page = new Page(document.body, events);
const catalog = new Page(ensureElement<HTMLElement>('.gallery'), events);
const successElement = cloneTemplate(successTemplate);
const success = new SuccessModal(successElement, {
	onClick: () => {
		modal.close();
	},
});

const contactElement = cloneTemplate(contactTemplate) as HTMLFormElement;
const contactForm = new ContactForm(contactElement, events);
const orderElement = cloneTemplate(orderTemplate) as HTMLFormElement;
const orderForm = new OrderForm(orderElement, events);

// данные с сервера
api.getCardList().then(appModel.setCards.bind(appModel)).catch(console.error);

// Отображение всех карточек  на страниц

events.on('products:updated', (products: IProduct[]) => {
	const cardItem = products.map((product) => {
		const cardElement = cloneTemplate(cardCatalogTemplate);
		const card = new Card(cardElement, () =>
			events.emit('card:select', product)
		);
		card.title = product.title;
		card.category = product.category;
		card.price = String(product.price);
		card.image = product.image;
		return cardElement;
	});

	catalog.renderCatalog(cardItem);
});

//откыть модальное окно карточки
events.on('card:select', (card: IProduct) => {
	const cardModal = cloneTemplate(cardModalTemplate);
	const cardInfoView = new CardInfoView(cardModal, events);
	cardInfoView.renderCard(card, appModel.isInBasket(card));
	modal.open(cardModal);
});

// Добавленить карточку товара в корзину
events.on('card:add', (item: IProduct) => {
	//добавить карточку в корзину
	appModel.addCardToBasket(item);
	//изменить количество на иконке корзины
	events.emit('basket:update', {
		items: appModel.basket,
		total: `${appModel.getTotalPrice()} синапсов`,
	});
	modal.close();
});

// открыть корзину
events.on('basket:open', () => {
	modal.open(basketModal);
});

// удалить карточку из корзины
events.on('card:remove', (item: IBasket) => {
	appModel.removeFromBasket(item.id);
	events.emit('basket:update', {
		items: appModel.basket,
		total: `${appModel.getTotalPrice()} синапсов`,
	});
});

// модальное окно заказа
events.on('order:open', () => {
	modal.open(orderElement);
	appModel.setOrderData(
		appModel.basket.map((item) => ({
			cardId: item.id,
			cardTotal: item.cardTotal,
		}))
	);
});

// Выбор вида оплаты
events.on('payment:change', (button: HTMLButtonElement) => {
	appModel.setOrderPayment(button.name);
});

// Выбор адреса
events.on('order:field:change', (data: { field: string; value: string }) => {
	if (data.field === 'address') {
		appModel.setContactData({ address: data.value });
	}
	appModel.formData({ [data.field]: data.value });
	const errors = appModel.validationForm();
	events.emit('formErrors:change', errors);
});

events.on('order:submit', () => {
	modal.open(contactElement);
});

// Заполнить форму контактов
events.on('contacts:field:change', (data: { field: string; value: string }) => {
	if (data.value) {
		appModel.setContactData({ [data.field]: data.value });
	}
	const errors = appModel.validationForm();
	events.emit('formErrors:change', errors);
});

events.on('order:submit', () => {
	modal.render({
		content: contactForm.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('contacts:submit', () => {
	api
		.createOrder(appModel.getOrderData())
		.then((data) => {
			success.render({
				total: data.total,
			});
			modal.open(successElement);
			appModel.clearBasket();
			events.emit('basket:update', {
				items: appModel.basket,
				total: appModel.getTotalPrice(),
			});
			orderForm.render({
				payment: '',
				address: '',
				valid: false,
				errors: [],
			});
			contactForm.render({
				email: '',
				phone: '',
				valid: false,
				errors: [],
			});
		})
		.catch((error) => console.log(error));
});

events.on('basket:update', (order: IOrder) => {
	page.counter = order.items.length;
	const cardItem = order.items.map((item, index) => {
		const card = cloneTemplate(BasketCardsTemplate);
		const cardItem = new BasketCards(card, events);
		cardItem.renderCard(item);
		cardItem.index = index + 1;
		return card;
	});

	basket.renderBasket(cardItem, order.total);
});

events.on('order:success', () => {
	modal.close();
});

// Блокировка прокрутки страницы при открытие модального окна
events.on('modal:open', () => {
	page.locked = true;
});

// Разлокировка прокрутки страницы при открытие модального окна
events.on('modal:close', () => {
	page.locked = false;
});
