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
    name_product?: string,
    cost?: number,
    count?: number,
    description?: string,
    weight?: number,
    width?: number,
    height?: string,
    color?: string,
    material?: string,
    photo_link?: string | null,
    photo?: string
}

