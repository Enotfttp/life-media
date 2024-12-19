export interface IProduct {
    id: string,
    name_product: string,
    cost: number | null,
    count: number | null,
    description: string,
    weight: number | null,
    width: number | null,
    height: number | null,
    color: string,
    material: string,
    photo_link?: string[] | null
}

export interface IProductForm {
    id: string,
    name_product: string,
    cost: string,
    count: string,
    description: string,
    weight: string,
    width: string,
    height: string,
    color: string,
    material: string,
    photo_link?: string[] | null
}

