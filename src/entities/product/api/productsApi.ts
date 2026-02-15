import type { ProductsResponse } from '@/entities/product/model'
import { baseApi } from '@/shared/api/baseApi'

export const productsApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getProducts: build.query<
			ProductsResponse,
			{
				q?: string
				limit: number
				skip: number
				sortBy?: string
				order?: 'asc' | 'desc'
			}
		>({
			query: ({ q, limit, skip, sortBy, order }) => {
				const params = {
					limit,
					skip,
					...(sortBy && order ? { sortBy, order } : {})
				}

				return q?.trim()
					? { url: '/products/search', params: { q, ...params } }
					: { url: '/products', params }
			}
		})
	})
})

export const { useGetProductsQuery } = productsApi
