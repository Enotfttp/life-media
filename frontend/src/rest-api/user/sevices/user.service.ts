import axios from "axios";
import {IUser, IUserForm} from '../models'

class UserService {
    private URL = process.env.BASE_API_URL + '/user'

    createUser() {
        return axios.post<IUser[]>(this.URL + '/create')
    }

    getUsers() {
        return axios.get<IUser[]>(this.URL + '/list')
    }

    getUser(id: string) {
        return axios.get<IUser>(this.URL + `/${id}`)
    }

    updateUser(body: IUserForm, id: string) {
        return axios.put<IUser>(this.URL + `/update/${id}`, body)
    }

    deleteUser(id: string) {
        return axios.delete<IUser>(this.URL + `/delete/${id}`)
    }

    loginUser(body: { login: string, password: string }) {
        return axios.post<IUser>(this.URL + '/login', body)
    }

    registrationUser(body: Omit<IUser, 'id' | 'chat_id' | 'order_id' | 'role_id'>) {
        return axios.post<IUser>(this.URL + '/registration', body)
    }
}

export const userService = new UserService();