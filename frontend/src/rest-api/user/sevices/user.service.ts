import axios from "axios";
import {IUser} from '../models'

class UserService {
    private URL = process.env.API_URL + '/user'

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

    loginUser({login, password}: { login: string, password: string }) {
        return axios.post<IUser>(this.URL + '/login', {login, password})
    }

    registrationUser(body: Omit<IUser, 'chat_id' & 'order_id' & 'role_id'>) {
        return axios.post<IUser>(this.URL + '/registration', body)
    }
}

export const userService = new UserService();