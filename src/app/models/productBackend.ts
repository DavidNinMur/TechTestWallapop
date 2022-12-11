export interface ProductBackend {
    title: string,
    description: string,
    price: string,
    email: string,
    image: string,
}

export interface AllProductsResponse {
    items: ProductBackend[]
}