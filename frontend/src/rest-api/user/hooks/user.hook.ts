import {IUser} from "src/rest-api/user/models";
import {useQuery} from "@tanstack/react-query";
import {userService} from '../sevices'

export function useRegistrationUser(body: Omit<IUser, 'chat_id' & 'order_id' & 'role_id'>) {
    const {data, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: () => userService.registrationUser(body),
        select: data => data.data,
    })

}

export function useLoginUser(body: { login: string, password: string }) {
    const {data, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: () => userService.loginUser(body),
        select: data => data.data,
    })
}
