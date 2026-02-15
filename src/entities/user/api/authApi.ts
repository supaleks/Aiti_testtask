import { baseApi } from '@/shared/api/baseApi'

export type LoginDto = {
	username: string
	password: string
	expiresInMins?: number
}

export type LoginResponse = {
	id: number
	username: string
	accessToken: string
	refreshToken: string
}

export type MeResponse = {
	id: number
	username: string
	email?: string
	firstName?: string
	lastName?: string
}

export const authApi = baseApi.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<LoginResponse, LoginDto>({
			query: body => ({
				url: '/auth/login',
				method: 'POST',
				body,
				headers: { 'Content-Type': 'application/json' }
			})
		}),
		me: build.query<MeResponse, void>({
			query: () => ({
				url: '/auth/me',
				method: 'GET'
			})
		})
	})
})

export const { useLoginMutation, useMeQuery } = authApi
