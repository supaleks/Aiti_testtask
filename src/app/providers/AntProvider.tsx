import { App as AntdApp, ConfigProvider } from 'antd'

export function AntdProvider({ children }: { children: React.ReactNode }) {
	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: "'Inter', sans-serif",
					colorBgLayout: '#F5F7FA',
					colorPrimary: '#242EDB',
					colorPrimaryHover: '#3A44E6',
					colorPrimaryActive: '#1B23B5',
					colorTextSecondary: '#8c8c8c'
				},
				components: {
					Checkbox: {
						controlInteractiveSize: 21
					},
					Divider: {
						colorText: '#EDEDED'
					},
					Form: {
						itemMarginBottom: 16
					},
					Button: {
						colorBorder: '#367aff',
						borderRadius: 12
					},
					Table: {
						headerBg: 'inherit',
						rowSelectedBg: 'transparent',
						rowSelectedHoverBg: 'transparent',
						headerColor: 'var(--ant-color-text-secondary)',
						cellPaddingBlock: 11
					}
				}
			}}
		>
			<AntdApp>{children}</AntdApp>
		</ConfigProvider>
	)
}
