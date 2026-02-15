import { Layout } from 'antd'
import type { ReactNode } from 'react'

const { Content } = Layout

export const PageTemplate = ({
	children,
	centered = false
}: {
	children: ReactNode
	centered?: boolean
}) => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Content
				style={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					justifyContent: centered ? 'center' : 'flex-start'
				}}
			>
				{children}
			</Content>
		</Layout>
	)
}
