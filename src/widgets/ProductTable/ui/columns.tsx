import type { Product } from '@/entities/product/model'
import MoreOutlined from '@ant-design/icons/MoreOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import styles from './ProductTable.module.scss'

const { Text } = Typography

type SortOrderUi = 'ascend' | 'descend' | null
type SortField = 'price' | 'rating' | null

export const getProductsColumns = (
	sortField: SortField,
	sortOrder: SortOrderUi
): ColumnsType<Product> => [
	{
		title: 'Наименование',
		dataIndex: 'title',
		key: 'title',
		render: (_value, record) => (
			<div className={styles.productCell}>
				<img
					className={styles.thumb}
					src={record.thumbnail}
					alt={record.title}
				/>
				<div className={styles.meta}>
					<Text
						strong
						className={styles.column_title}
					>
						{record.title}
					</Text>
					<Text
						type="secondary"
						className={styles.category}
					>
						{record.category}
					</Text>
				</div>
			</div>
		)
	},
	{
		title: 'Вендор',
		dataIndex: 'brand',
		key: 'brand',
		render: (v?: string) => (
			<Text
				strong
				className={styles.vendor}
			>
				{v ?? '—'}
			</Text>
		)
	},
	{
		title: 'Артикул',
		dataIndex: 'sku',
		key: 'sku',
		render: (v?: string) => <Text className={styles.sku}>{v ?? '—'}</Text>
	},

	{
		title: 'Рейтинг',
		dataIndex: 'rating',
		key: 'rating',
		sorter: true,
		sortOrder: sortField === 'rating' ? sortOrder : null,
		render: (v: number) => (
			<Text>
				<Text
					type={v < 3 ? 'danger' : undefined}
					className={styles.rating}
				>
					{v}
				</Text>
				/5
			</Text>
		)
	},

	{
		title: 'Цена',
		dataIndex: 'price',
		key: 'price',
		sorter: true,
		sortOrder: sortField === 'price' ? sortOrder : null,
		render: (v: number) => <Text className={styles.price}>{`$${v}`}</Text>
	},
	{
		title: '',
		key: 'actions',
		width: 90,
		align: 'right',
		render: (_: any, record) => {
			const items: MenuProps['items'] = [
				{ key: 'edit', label: 'Редактировать' },
				{ key: 'delete', label: 'Удалить' }
			]

			return (
				<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
					<Button
						type="primary"
						size="small"
						icon={<PlusOutlined />}
						onClick={() => console.log('add', record.id)}
					/>

					<Dropdown menu={{ items }}>
						<Button
							shape="circle"
							size="small"
							icon={<MoreOutlined />}
						/>
					</Dropdown>
				</div>
			)
		}
	}
]
