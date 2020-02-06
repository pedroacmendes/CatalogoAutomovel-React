import { useState, useEffect, useCallback } from 'react'
import { stringify } from 'query-string'

const useApi = (pathname, pageSize, page, filter, autoReload) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchData = useCallback(() => {
		if (!pathname) {
			return null
		}
		setError(null)
		setLoading(true)
		const abortController = new AbortController()

		const searchParams = stringify({
			...(filter || {}),
			page,
			page_size: pageSize
		}, { arrayFormat: 'comma' })

		const url = `${ pathname }${ searchParams ? `?${ searchParams }` : '' }`
		fetch(url, {
			signal: abortController.signal,
			credentials: 'same-origin',
			headers: {
				'Accept': 'application/json'
			}
		})
			.then((r) => {
				if (r.ok) {
					try {
						return r.json()
					} catch (_) {
						return null
					}
				} else {
					setError({
						status: r.status,
						message: r.statusText
					})
				}
			})
			.then(r => {
				setData(r)
				setLoading(false)
			})
			.catch((e) => {
				console.log('error', e)
				setLoading(false)
				setError({
					status: 500,
					message: e.toString && e.toString()
				})
			})

		return () => {
			try {
				abortController.abort()
			} catch (_) {}
		}
	}, [pathname, page, pageSize])

	useEffect(() => {
		setData(null)
		const cancel = fetchData()
		return () => {
			setData(null)
			cancel && cancel()
		};
	}, [fetchData])

	useEffect(() => {
		if (autoReload) {
			window.addEventListener('API:UPDATED', fetchData)
			return () => {
				window.removeEventListener('API:UPDATED', fetchData)
			}
		}
	}, [fetchData, autoReload])
	
	return [data, loading, error, fetchData]
}

export default useApi