import { authStorage } from './authStore'

export function useIsAuthenticated(): boolean {
	return !!authStorage.getAccessToken()
}
