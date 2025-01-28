import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {orderService} from '../sevices'
import {IOrder, IOrderStatus} from "src/rest-api/order/models";

export function useMutationDeleteOrder() {
    return useMutation({
        mutationKey: ['order'],
        mutationFn: async (body: { login: string, password: string }) => await orderService.deleteOrder(body),
    })
}

export function useMutationUpdateOrder() {
    const queryClient = useQueryClient();
    
    return useMutation({
            mutationFn: async (  body: {productId:string, userId:string, type:string }) => await orderService.updateOrder(body),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['order']});
                queryClient.invalidateQueries({queryKey: ['orders-idle']});
            },
        },
    )
}
export function useMutationUpdateStatusOrder() {
    const queryClient = useQueryClient();

    return useMutation({
            mutationFn: async ( body:{userId:string, statusId:string, orderId:string}) => await orderService.updateStatusOrder(body),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['orders']});
            },
        },
    )
}
export function useMutationUpdateStatusOrderBasket() {
    const queryClient = useQueryClient();

    return useMutation({
            mutationFn: async ( userId:string) => await orderService.updateStatusOrderBasket(userId),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['orders']});
            },
        },
    )
}

export const useGetCurrentOrder = (productId: string, userId: string, options?: { enabled: boolean }) => {
    return useQuery({
        queryKey: ['order', productId],
        queryFn: async () => await orderService.getOrder(productId, userId),
        select: (data) => data.data as IOrder,
        ...options
    })
}
export const useGetFirstStatusOrders= ( userId: string, options?: { enabled: boolean }) => {
    return useQuery({
        queryKey: ['orders-idle'],
        queryFn: async () => await orderService.getFirstStatusOrders(userId),
        select: (data) => data.data as IOrder[],
        ...options
    })
}

export const useGetOrders= ( userId: string, options?: { enabled: boolean }) => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => await orderService.getOrders(userId),
        select: (data) => data.data as IOrder[],
        ...options
    })
}

export const getOrderStatus = ( ) => {
    return useQuery({
        queryKey: ['orders-status'],
        queryFn: async () => await orderService.getOrderStatus(),
        select: (data) => data.data as IOrderStatus[],
    })
}