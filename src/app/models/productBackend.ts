export interface ProductBackend {
    name: String,
    description: String,
    price: Number,
    email: String,
    photo: String,
}

export interface AllProductsResponse {
    items: ProductBackend[]
}