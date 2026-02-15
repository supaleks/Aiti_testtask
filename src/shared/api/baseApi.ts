import { authStorage } from '@/entities/user'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://dummyjson.com',
	prepareHeaders: headers => {
		const token = authStorage.getAccessToken()
		if (token) headers.set('Authorization', `Bearer ${token}`)
		return headers
	}
})

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery,
	endpoints: () => ({})
})
