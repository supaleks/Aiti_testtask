import type { TablePaginationConfig } from 'antd'
import { App as AntdApp } from 'antd'
import type { SorterResult } from 'antd/es/table/interface'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'

type SortOrderUi = 'ascend' | 'descend' | null
type SortField = 'price' | 'rating' | null

const urlToUiOrder = (o: string | null): SortOrderUi =>
	o === 'asc' ? 'ascend' : o === 'desc' ? 'descend' : null

const uiToUrlOrder = (o: SortOrderUi) =>
	o === 'ascend' ? 'asc' : o === 'descend' ? 'desc' : null

const clampInt = (v: string | null, fallback = 1) => {
	const n = Number(v)
	return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback
}

export const useProductsTable = (pageSize = 10, debounceMs = 400) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const qRaw = searchParams.get('q') ?? ''
	const [qDebouncedRaw, setQDebouncedRaw] = useState(qRaw)

	useEffect(() => {
		const id = window.setTimeout(() => setQDebouncedRaw(qRaw), debounceMs)
		return () => window.clearTimeout(id)
	}, [qRaw, debounceMs])

	const q = useMemo(() => {
		const trimmed = qDebouncedRaw.trim()
		return trimmed ? trimmed : undefined
	}, [qDebouncedRaw])

	const sortFieldFromUrl = searchParams.get('sort')
	const sortField: SortField =
		sortFieldFromUrl === 'price' || sortFieldFromUrl === 'rating'
			? sortFieldFromUrl
			: null

	const sortOrder: SortOrderUi = urlToUiOrder(searchParams.get('order'))

	const page = clampInt(searchParams.get('page'), 1)

	const skip = (page - 1) * pageSize

	const pagination = useMemo<TablePaginationConfig>(
		() => ({
			current: page,
			pageSize,
			showSizeChanger: false,
			showLessItems: true
		}),
		[page, pageSize]
	)

	const { message } = AntdApp.useApp()

	const resetTableParams = () => {
		const next = new URLSearchParams(window.location.search)

		;['q', 'sort', 'order', 'page'].forEach(key => {
			next.delete(key)
		})

		setSearchParams(next, { replace: true })
		message.info('Фильтры сброшены')
	}

	const onTableChange = (
		p: TablePaginationConfig,
		_filters: Record<string, any>,
		sorter: SorterResult<any> | SorterResult<any>[]
	) => {
		const next = new URLSearchParams(window.location.search)

		const s = Array.isArray(sorter) ? sorter[0] : sorter
		const nextField = (s?.field as SortField) ?? null
		const nextOrderUi = (s?.order as SortOrderUi) ?? null

		const curField = sortField
		const curOrder = sortOrder

		const sortChanged = nextField !== curField || nextOrderUi !== curOrder

		if (sortChanged) {
			if (!nextField || !nextOrderUi) {
				next.delete('sort')
				next.delete('order')
			} else {
				if (nextField !== 'price' && nextField !== 'rating') return
				next.set('sort', nextField)
				next.set('order', uiToUrlOrder(nextOrderUi)!)
			}

			next.delete('page')
			setSearchParams(next, { replace: true })
			return
		}

		const nextPage = p.current ?? 1
		if (nextPage <= 1) next.delete('page')
		else next.set('page', String(nextPage))

		setSearchParams(next, { replace: false })
	}

	const sortBy = sortField ?? undefined
	const order: 'asc' | 'desc' | undefined =
		sortOrder === 'ascend'
			? 'asc'
			: sortOrder === 'descend'
				? 'desc'
				: undefined

	return {
		q,
		skip,
		limit: pageSize,
		pagination,
		onTableChange,
		sortBy,
		order,
		sortField,
		sortOrder,
		page,
		resetTableParams
	}
}
