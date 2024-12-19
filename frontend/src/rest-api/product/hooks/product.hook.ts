import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {productService} from '../sevices'
import {IProduct} from "../models";


export function useGetProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => productService.getProducts(),
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
