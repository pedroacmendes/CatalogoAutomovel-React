import React, { useState } from 'react'
import useSession from '../../../hooks/useSession'
import { Redirect, useHistory } from 'react-router-dom'
import styles from './Login.module.sass'
import { Button } from 'react-bootstrap'


const Login = () => {
	const [session] = useSession()
	const history = useHistory()
	const [error, setError] = useState(null)
	const [submitting, setSubmitting] = useState(false)
	const [credentials, setCredentials] = useState({ username: '', password: '' })

	if (session) {
		return <Redirect to='/admin' />
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		if (submitting) { return }
		setSubmitting(true)
		setError(null)
		fetch('/api/login', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
			.then((r) => r.ok && r.json())
			.then((r) => {
				setSubmitting(false)
				if (!r) {
					setError('Invalid credentials')
					return
				}
				setTimeout(() => {
					history.replace('/admin')
				}, 10)
			})
			.catch((err) => {
				setSubmitting(false)
				setError(`${err}`)
			})
	}
	return (
		<>
			<header className={styles['header']}>
				<h2>Página de Login</h2>
			</header>

			<div className={styles['root']}>
				<form className={styles['input-form']} onSubmit={handleSubmit}>
					{error && (
						<div className={styles['error']}>{error}</div>
					)}
					<h3>Username: </h3>
					<input type="text" value={credentials.username} onChange={(e) => { setCredentials({ ...credentials, username: e.target.value }) }} />
					<h3>Password: </h3>
					<input type="password" value={credentials.password} onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }} />
					<br></br><br></br>
					<button className={styles['btn']} type="input">Login</button>
				</form>
			</div>
		</>
	)
}

export default Login