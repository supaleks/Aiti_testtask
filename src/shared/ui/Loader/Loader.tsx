import { Spin } from 'antd'

export const Loader = () => {
	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Spin
				size="large"
				description="Загрузка..."
			/>
		</div>
	)
}
