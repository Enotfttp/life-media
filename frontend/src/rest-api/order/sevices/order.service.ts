import axios from "axios";
import {IOrder, IOrderStatus} from '../models'

class OrderService {
    private URL = process.env.BASE_API_URL + '/order'

    getOrder(productId: string, userId: string) {
        return axios.get<IOrder>(this.URL, {params:{
                userId:userId,
                productId:productId
            }})
    }

    getFirstStatusOrders(userId: string) {
        return axios.get<IOrder[]>(`${this.URL}s-idle/${userId}`)
    }

    getOrders(userId: string) {
        return axios.get<IOrder[]>(`${this.URL}s/${userId}`)
    }

    updateOrder(body: { productId:string, userId:string, type:string }) {
        return axios.put<IOrder>(this.URL + `/update`,body)
    }

    updateStatusOrder(body:{userId:string, statusId:string, orderId:string}) {
        return axios.put<IOrder>(this.URL + `/update-status`,body)
    }

    updateStatusOrderBasket(userId:string) {
        return axios.put<IOrder>(this.URL + `/update-status-basket/${userId}`)
    }

    deleteOrder(id: string) {
        return axios.delete<IOrder>(this.URL + `/${id}`)
    }

    getOrderStatus() {
        return axios.get<IOrderStatus[]>(`${this.URL}s-status`)
    }
}

export const orderService = new OrderService();