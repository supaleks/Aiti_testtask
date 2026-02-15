const ACCESS_TOKEN_KEY = 'accessToken'

export const authStorage = {
	set(accessToken: string, remember: boolean = false) {
		const storage = remember ? localStorage : sessionStorage
		const other = remember ? sessionStorage : localStorage

		storage.setItem(ACCESS_TOKEN_KEY, accessToken)
		other.removeItem(ACCESS_TOKEN_KEY)
	},
	getAccessToken() {
		return (
			localStorage.getItem(ACCESS_TOKEN_KEY) ??
			sessionStorage.getItem(ACCESS_TOKEN_KEY)
		)
	},
	clear() {
		localStorage.removeItem(ACCESS_TOKEN_KEY)
		sessionStorage.removeItem(ACCESS_TOKEN_KEY)
	}
}
