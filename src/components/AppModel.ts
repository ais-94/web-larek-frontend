import { ApiListResponse, Api } from './base/api'
import { IOrderLot, IPostOrderLot, IProductItem } from '../types'; 


export interface IApiModel {
    cdn: string;
    items: IProductItem[];
    getListProductCard: () => Promise<IProductItem[]>;
    postOrderLot: (order: IOrderLot) => Promise<IPostOrderLot>;
  }
  
  export class AppModel extends Api implements IApiModel {
    cdn: string;
    items: IProductItem[];
  
    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
      super(baseUrl, options);
      this.cdn = cdn;
    }
  
    // массив карточек
    getListProductCard(): Promise<IProductItem[]> {
      return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
        data.items.map((item) => ({
          ...item,
          image: this.cdn + item.image,
        }))
      );
    }
  
    // ответ от сервера по заказу
    postOrderLot(order: IOrderLot): Promise<IPostOrderLot> {
      return this.post(`/order`, order).then((data: IPostOrderLot) => data);
    }
  }