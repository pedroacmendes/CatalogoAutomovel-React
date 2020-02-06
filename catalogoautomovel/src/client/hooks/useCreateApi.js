import { useState, useCallback } from 'react'

const useCreateApi = (pathname) => {

	const [submitting, setSubmitting] = useState(false)
	const [success, setSuccess] = useState(null)
	const [error, setError] = useState(null)

	const createOrUpdate = useCallback((data) => {
		if (submitting) { return }
		setSubmitting(true)
		setError(null)
		const url = (data.id || data._id) ? `${ pathname }/${ (data.id || data._id) }` : pathname
		fetch(url, {
			method: data.id ? 'PUT' : 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((r) => {
				if (r.ok) {
					return r.json()
				} else {
					setError({
						status: r.status,
						message: r.statusText
					})
				}
			})
			.then(r => {
				if (r) {
					setSuccess(true)
				}
				setSubmitting(false)
			})
			.catch((e) => {
				console.log('error', e)
				setSubmitting(false)
				setError({
					status: 500,
					message: e.toString && e.toString()
				})
			})
	}, [pathname, submitting])

	return [createOrUpdate, submitting, success, error]
}

export default useCreateApi