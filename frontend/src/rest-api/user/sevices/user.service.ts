import axios from "axios";
import {IUser} from '../models'

class UserService {
    private URL = process.env.BASE_API_URL + '/user'

    createUser() {
        return axios.post<IUser[]>(this.URL + '/create')
    }

    getUsers() {
        return axios.get<IUser[]>(this.URL + '/list')
    }

    getUser(id: number) {
        return axios.get<IUser>(this.URL + `/${id}`)
    }

    updateUser() {
        return axios.put<IUser>(this.URL + 'update')
    }

    deleteUser(id: number) {
        return axios.delete<IUser>(this.URL + `/${id}`)
    }

    loginUser(body: { login: string, password: string }) {
        console.log('TUT = ', body)
        return axios.post<IUser>(this.URL + '/login', body)
    }

    registrationUser(body: Omit<IUser, 'id' | 'chat_id' | 'order_id' | 'role_id'>) {
        return axios.post<IUser>(this.URL + '/registration', body)
    }
}

export const userService = new UserService();