export type Product = {
	id: number
	title: string
	brand?: string
	sku?: string
	rating: number
	price: number
	thumbnail: string
	category: string
}

export type ProductsResponse = {
	products: Product[]
	total: number
	skip: number
	limit: number
}
