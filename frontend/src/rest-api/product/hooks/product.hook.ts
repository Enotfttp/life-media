import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {productService} from '../sevices'
import {IProduct, IProductForm} from "../models";


export function usePostProducts(search?:string) {
    return useQuery({
        queryKey: ['products', search],
        queryFn: async() => await productService.postProducts(search),
        select: data => data.data,
    })
}

export function useGetProduct(id: string) {
    return useQuery({
        queryKey: ['product'],
        queryFn: () => productService.getProduct(id),
        select: data => data.data,
    })
}

export function useMutationCreateProducts() {
    const queryClient = useQueryClient();

    return useMutation({
            mutationKey: ['products'],
            mutationFn: async (body: Omit<IProduct, 'id'>) => await productService.createProduct(body),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['products']});
            },
        },
    )
}

export function useMutationUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
            mutationKey: ['products'],
            mutationFn: async ({body, id}: { body: IProductForm, id: string }) => await productService.updateProduct({
                body,
                id
            }),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['products']});
            },
        },
    )
}
