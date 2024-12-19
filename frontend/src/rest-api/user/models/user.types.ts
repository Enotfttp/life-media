export interface IUser {
    id: string,
    email: string,
    firstname: string,
    patronymic: string,
    lastname: string,
    login: string,
    password: string,
    phone: string,
    chat_id: number,
    order_id: number,
    role_id: number
}

export interface IUserForm {
    email: string,
    firstname: string,
    patronymic: string,
    lastname: string,
    phone: string,
}

