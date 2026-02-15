import { AntdProvider, store } from '@/app/providers'
import '@/shared/styles/main.scss'
import { ErrorBoundary, Loader } from '@/shared/ui'
import 'antd/dist/reset.css'
import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router'
import { PrivateRoute } from './providers/routes/PrivateRoute'
const LoginPage = lazy(() => import('@/pages/LoginPage/LoginPage'))
const ProductsPage = lazy(() => import('@/pages/ProductsPage/ProductsPage'))

function App() {
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<AntdProvider>
					<Suspense fallback={<Loader />}>
						<Routes>
							<Route
								path="/"
								element={
									<Navigate
										to="/products"
										replace
									/>
								}
							/>
							<Route
								path="/login"
								element={<LoginPage />}
							/>

							<Route element={<PrivateRoute />}>
								<Route
									path="/products"
									element={<ProductsPage />}
								/>
							</Route>

							<Route
								path="*"
								element={
									<Navigate
										to="/products"
										replace
									/>
								}
							/>
						</Routes>
					</Suspense>
				</AntdProvider>
			</Provider>
		</ErrorBoundary>
	)
}

export default App
