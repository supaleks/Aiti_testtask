import PlusCircleIcon from '@/assets/PlusCircle.svg?react'
import RefreshIcon from '@/assets/refresh.svg?react'
import { useGetProductsQuery } from '@/entities/product/api'
import type { Product } from '@/entities/product/model'
import {
	CreateProductModal,
	type CreateProductValues
} from '@/features/product'
import { Button, Result, Table, Typography } from 'antd'
import { clsx } from 'clsx'
import { useMemo, useState } from 'react'
import { useProductsTable } from '../model/useProductTable'
import styles from './ProductTable.module.scss'
import { getProductsColumns } from './columns'

export const ProductTable = () => {
	const [createOpen, setCreateOpen] = useState(false)

	const handleCreate = async (values: CreateProductValues) => {
		console.log('create', values)
		setCreateOpen(false)
	}

	const {
		sortField,
		sortOrder,
		sortBy,
		order,
		onTableChange,
		pagination,
		q,
		limit,
		skip,
		resetTableParams
	} = useProductsTable(10)

	const args = useMemo(
		() => ({ q, limit, skip, sortBy, order }),
		[q, limit, skip, sortBy, order]
	)
	const { data, isLoading, isError } = useGetProductsQuery(args)

	return (
		<div className={clsx(styles.productsTable, 'wrapper')}>
			<div className={styles.header}>
				<Typography.Title
					level={4}
					className={styles.title}
				>
					Все позиции
				</Typography.Title>

				<div style={{ display: 'flex', gap: 8 }}>
					<Button
						onClick={resetTableParams}
						className={clsx(styles.refreshBtn, styles.btn)}
					>
						<RefreshIcon
							width={22}
							height={22}
						/>
					</Button>
					<Button
						type="primary"
						className={clsx(styles.addBtn, styles.btn)}
						onClick={() => setCreateOpen(true)}
					>
						<PlusCircleIcon
							width={22}
							height={22}
						/>
						Добавить
					</Button>
				</div>

				<CreateProductModal
					open={createOpen}
					onClose={() => setCreateOpen(false)}
					onSubmit={handleCreate}
				/>
			</div>

			{isError ? (
				<Result
					status="error"
					title="Что-то пошло не так"
					subTitle="Пожалуйста, проверьте ваше интернет-соединение и нажмите кнопку обновить"
				/>
			) : (
				<Table<Product>
					className={styles.table}
					rowSelection={{ type: 'checkbox' }}
					rowKey="id"
					loading={isLoading}
					columns={getProductsColumns(sortField, sortOrder)}
					dataSource={data?.products ?? []}
					pagination={{
						...pagination,
						total: data?.total ?? 0,
						showLessItems: true,
						showSizeChanger: false,
						showQuickJumper: false,
						style: { marginTop: 40 },
						showTotal: (total, range) =>
							`Показано ${range[0]}–${range[1]} из ${total}`
					}}
					onChange={onTableChange}
				/>
			)}
		</div>
	)
}
