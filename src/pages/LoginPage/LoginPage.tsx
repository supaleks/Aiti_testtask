import { useIsAuthenticated } from '@/entities/user'
import { LoginForm } from '@/features/auth'
import { PageTemplate } from '@/shared/layout'
import { Navigate } from 'react-router'

const LoginPage = () => {
	const isAuthenticated = useIsAuthenticated()

	if (isAuthenticated) {
		return (
			<Navigate
				to="/products"
				replace
			/>
		)
	}
	return (
		<PageTemplate centered>
			<LoginForm />
		</PageTemplate>
	)
}

export default LoginPage
