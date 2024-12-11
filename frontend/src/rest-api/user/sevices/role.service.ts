import axios from "axios";
import {IRole} from "src/rest-api/user/models";

class RoleService {
    private URL = process.env.API_URL + '/role'

    createRole() {
        return axios.post<IRole[]>(this.URL + '/create')
    }

    getRoles() {
        return axios.get<IRole[]>(this.URL + '/list')
    }

    getRole(id: number) {
        return axios.get<IRole>(this.URL + `/${id}`)
    }

    updateRole() {
        return axios.put<IRole>(this.URL + 'update')
    }

    deleteRole(id: number) {
        return axios.delete<IRole>(this.URL + `/${id}`)
    }

    loginRole() {
        return axios.post<IRole>(this.URL + '/login')
    }

    registrationRole() {
        return axios.post<IRole>(this.URL + '/registration')
    }
}

export const roleService = new RoleService()