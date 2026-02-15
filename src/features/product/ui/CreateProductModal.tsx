import { App as AntdApp, Form, Input, InputNumber, Modal } from 'antd'
import { useEffect } from 'react'

export type CreateProductValues = {
	title: string
	price: number
	brand: string
	sku: string
}

type Props = {
	open: boolean
	onClose: () => void
	onSubmit: (values: CreateProductValues) => Promise<void> | void
	loading?: boolean
}

export function CreateProductModal({
	open,
	onClose,
	onSubmit,
	loading
}: Props) {
	const { message } = AntdApp.useApp()

	const [form] = Form.useForm<CreateProductValues>()

	useEffect(() => {
		if (open) {
			form.resetFields()
		}
	}, [open, form])

	const handleOk = async () => {
		try {
			const values = await form.validateFields()
			await onSubmit(values)
			form.resetFields()
			message.success('Товар создан')
			onClose()
		} catch (e: any) {
			if (e?.errorFields) return
			message.error(e?.data?.message ?? 'Не удалось создать товар')
		}
	}

	return (
		<Modal
			title="Добавить товар"
			open={open}
			onCancel={onClose}
			onOk={handleOk}
			okText="Сохранить"
			cancelText="Отмена"
			confirmLoading={loading}
		>
			<Form
				form={form}
				layout="vertical"
				requiredMark={false}
				initialValues={{ title: '', price: 0, brand: '', sku: '' }}
			>
				<Form.Item
					label="Наименование"
					name="title"
					rules={[{ required: true, message: 'Введите наименование' }]}
				>
					<Input placeholder="Red Lipstick" />
				</Form.Item>

				<Form.Item
					label="Цена"
					name="price"
					rules={[{ required: true, message: 'Введите цену' }]}
				>
					<InputNumber
						style={{ width: '100%' }}
						min={0}
						placeholder="1234"
					/>
				</Form.Item>

				<Form.Item
					label="Вендор"
					name="brand"
					rules={[{ required: true, message: 'Введите вендор' }]}
				>
					<Input placeholder="Apple" />
				</Form.Item>

				<Form.Item
					label="Артикул"
					name="sku"
					rules={[{ required: true, message: 'Введите артикул' }]}
				>
					<Input placeholder="APL-001" />
				</Form.Item>
			</Form>
		</Modal>
	)
}
