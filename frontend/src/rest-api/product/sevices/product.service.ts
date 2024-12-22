import axios from "axios";
import {IProduct, IProductForm} from "../models";

class ProductService {
    private URL = process.env.BASE_API_URL + '/product'

    createProduct(body: Omit<IProduct, 'id'>) {
        return axios.post<IProduct[]>(this.URL + '/create', body)
    }

    getProducts() {
        return axios.get<IProduct[]>(this.URL + '/list')
    }

    getProduct(id: string) {
        return axios.get<IProduct>(this.URL + `/${id}`)
    }

    updateProduct({body, id}: { body: IProductForm, id: string }) {
        return axios.put<IProduct>(this.URL + `/update/${id}`, body)
    }

    deleteProduct(id: string) {
        return axios.delete<IProduct>(this.URL + `/delete/${id}`)
    }

}

export const productService = new ProductService()