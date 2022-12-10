export interface ProductBackend {
    title: String,
    description: String,
    price: Number,
    email: String,
    image: String,
}

export interface AllProductsResponse {
    items: ProductBackend[]
}