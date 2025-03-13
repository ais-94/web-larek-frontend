import { Api, ApiListResponse } from './base/api';
import { CDN_URL } from '../utils/constants';
import { IProduct, IOrderLot, IOrder, IApiProductModel } from '../types/index';

export class WebApi extends Api implements IApiProductModel {
	constructor(baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
	}

	async createOrder(order: IOrderLot): Promise<IOrder> {
		const preparedOrder = {
			address: order.address,
			phone: order.phone,
			email: order.email,
			payment: order.payment,
			total: order.total,
			items: order.items.map((item) => item.cardId),
		};

		try {
			const response = (await this.post(
				'/order',
				preparedOrder,
				'POST'
			)) as IOrderLot;
			return {
				id: response.id,
				total: `${response.total} синапсов`,
				items: order.items.map((item) => ({
					id: item.cardId,
					title: 'Товар',
					price: '0 синапсов',
					cardTotal: item.cardTotal,
				})),
			};
		} catch (error) {
			throw error;
		}
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
