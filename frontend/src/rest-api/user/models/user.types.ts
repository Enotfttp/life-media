export interface IUser {
    id: string,
    email: string,
    firstname: string,
    patronymic: string,
    lastname: string,
    login: string,
    password: string,
    photo_link: string,
    phone: string,
    chat_id: number,
    order_id: number,
    name_role?: string,
}

export interface IUserForm {
    email: string,
    firstname: string,
    patronymic: string,
    lastname: string,
    phone?: string,
    photo?: string,
    photo_link?: string
}

