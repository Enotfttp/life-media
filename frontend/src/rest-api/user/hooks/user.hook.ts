import {IUser, IUserForm} from "src/rest-api/user/models";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {userService} from '../sevices'

// export function useRegistrationUser(body: Omit<IUser, 'chat_id' & 'order_id' & 'role_id'>) {
//     return useQuery({
//         queryKey: ['user'],
//         queryFn: () => userService.registrationUser(body),
//         select: data => data.data,
//     })
// }

// export function useLoginUser(body: { login: string, password: string }) {
//     return useQuery({
//         queryKey: ['user'],
//         queryFn: () => userService.loginUser(body),
//         select: (data) => data.data,
//     })
// }

export function useMutationLoginUser() {
    return useMutation({
        mutationKey: ['user'],
        mutationFn: async (body: { login: string, password: string }) => await userService.loginUser(body),
    })
}

export function useMutationRegistrationUser() {
    return useMutation({
            mutationFn: async (body: Omit<IUser, 'id' | 'chat_id' | 'order_id' | 'role_id'>) => await userService.registrationUser(body),
        },
    )
}

export function useMutationUpdatenUser() {
    const queryClient = useQueryClient();
    
    return useMutation({
            mutationFn: async ({body, id}: { body: IUserForm, id: string }) => await userService.updateUser(body, id),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['user']});
            },
        },
    )
}

export const getCurrentUser = (id: string) => {
    return useQuery({
        queryKey: ['user'],
        refetchInterval: 60 * 60 * 1000, // обновляем каждый 1 час
        staleTime: 60 * 60 * 1000,
        queryFn: async () => await userService.getUser(id),
        select: (data) => data.data as IUser,
    })
}