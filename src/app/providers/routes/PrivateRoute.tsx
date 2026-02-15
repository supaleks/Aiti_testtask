import { authStorage, useIsAuthenticated } from '@/entities/user'
import { useMeQuery } from '@/entities/user/api'
import { Loader } from '@/shared/ui'
import { Result } from 'antd'
import { Navigate, Outlet } from 'react-router'

export const PrivateRoute = () => {
	const isAuthenticated = useIsAuthenticated()

	if (!isAuthenticated)
		return (
			<Navigate
				to="/login"
				replace
			/>
		)

	const { isLoading, isError, error } = useMeQuery()

	if (isLoading) {
		return <Loader />
	}

	const status = (error as any)?.status
	if (isError && status === 401) {
		authStorage.clear()
		return (
			<Navigate
				to="/login"
				replace
			/>
		)
	}

	if (isError) {
		return (
			<Result
				status="error"
				title="Что-то пошло не так"
				subTitle="Пожалуйста, проверьте ваше интернет-соединение и обновите страницу"
			/>
		)
	}

	return <Outlet />
}
