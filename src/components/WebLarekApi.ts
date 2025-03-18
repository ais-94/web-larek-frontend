import { Api, ApiListResponse } from './base/api';
import { CDN_URL } from '../utils/constants';
import { IProduct, IOrderLot, IOrder, IApiProductModel } from '../types/index';
import { AppModel } from './AppModel';
import { EventEmitter } from './base/events';

const events = new EventEmitter();

const appModel = new AppModel(events);

export class webLarekApi extends Api implements IApiProductModel {
	constructor(baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
	}

	preparedOrderr = appModel.preparedOrder;

	createOrder(order: IOrderLot): Promise<IOrder> {
		return this.post(`/order`, this.preparedOrderr(order)).then(
			(data: IOrder) => data
		);
	}

	//массив карточек
	getCardList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: `${CDN_URL}${item.image}`,
			}))
		);
	}
}
