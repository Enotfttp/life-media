import axios from "axios";
import {IOrder} from '../models'

class OrderService {
    private URL = process.env.BASE_API_URL + '/order'

    getOrder(productId: string, userId: string) {
        return axios.get<IOrder>(this.URL, {params:{
                userId:userId,
                productId:productId
            }})
    }
    getOrders(userId: string) {
        return axios.get<IOrder[]>(`${this.URL}s/${userId}`)
    }

    updateOrder(body: { productId:string, userId:string, type:string }) {
        return axios.put<IOrder>(this.URL + `/update`,body)
    }

    deleteOrder(id: string) {
        return axios.delete<IOrder>(this.URL + `/${id}`)
    }
}

export const orderService = new OrderService();