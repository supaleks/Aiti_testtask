import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

type Options = {
	debounceMs?: number
	replace?: boolean
	trim?: boolean
	resetKeys?: string[]
}

export function useQueryParam(
	key: string,
	{
		debounceMs = 400,
		replace = true,
		trim = true,
		resetKeys = []
	}: Options = {}
) {
	const [searchParams, setSearchParams] = useSearchParams()
	const fromUrl = searchParams.get(key) ?? ''

	const [value, setValue] = useState(fromUrl)

	useEffect(() => {
		setValue(fromUrl)
	}, [fromUrl])

	useEffect(() => {
		const id = window.setTimeout(() => {
			const next = new URLSearchParams(window.location.search)

			const raw = value
			const normalized = trim ? raw.trim() : raw
			const current = next.get(key) ?? ''

			const currentNormalized = trim ? current.trim() : current
			if (normalized === currentNormalized) return

			if (normalized) next.set(key, normalized)
			else next.delete(key)

			for (const k of resetKeys) next.delete(k)

			setSearchParams(next, { replace })
		}, debounceMs)

		return () => window.clearTimeout(id)
	}, [value, key, debounceMs, replace, trim, resetKeys, setSearchParams])

	return { value, setValue }
}
