import { Button, Result } from 'antd'
import { Component, type ReactNode } from 'react'

interface Props {
	children: ReactNode
}

interface State {
	hasError: boolean
	error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { hasError: false, error: null }
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
		console.error('Error caught by boundary:', error, errorInfo)
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null })
	}

	render() {
		if (this.state.hasError) {
			return (
				<div
					style={{
						minHeight: '100vh',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Result
						status="500"
						title="Что-то пошло не так"
						subTitle={
							import.meta.env.DEV
								? this.state.error?.message || 'Неизвестная ошибка'
								: 'Пожалуйста, перезагрузите страницу или обратитесь в поддержку'
						}
						extra={
							<Button
								type="primary"
								onClick={this.handleReset}
							>
								{import.meta.env.DEV ? 'Попробовать снова' : 'На главную'}
							</Button>
						}
					/>
				</div>
			)
		}

		return this.props.children
	}
}
