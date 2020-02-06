import React, { useState } from 'react'
import useSession from '../../../hooks/useSession'
import useApi from '../../../hooks/useApi'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { parse } from 'query-string'
import FormController from '../../forms/FormController'
import PaginationControls from '../../../components/PaginationControls/PaginationControls'
import styles from './CatalogManager.module.sass'

const CatalogManager = () => {
	const [session, removeSession] = useSession()
	const history = useHistory()
	const [[form, formData], setForm] = useState([])
	const { search } = useLocation()

	const parseParams = parse(search)
	const [data, loading, error, reload] = useApi(`/api/articles`, parseParams.page_size || 10, parseParams.page || 0, {}, true)
	const { list = [], pagination = {} } = data || {}
	const items = list || []

	return (
		<>
				<header className={styles['header']}>
					<h4>Hello {session && session.username}!</h4>
					<div>
						<Link className={styles['link']} to="/">Website</Link>
						<button onClick={() => {
							session && removeSession()
							setTimeout(() => {
								history.push('/admin/login')
							}, 10)
						}}>Logout</button>
					</div>
				</header>
				<main className={styles['main']}>
					{loading && <div className={styles['loading']}>Loading</div>}
					{error && <div className={styles['error']}>{error.message}</div>}
					<div className={styles['actions']}>
						<div><h4>List of articles</h4></div>
						<div>
							<button onClick={() => {
								setForm && setForm(['ArticleForm'])
							}}>New</button>
						</div>
					</div>
					<div className={styles['items-header']}>
						<small>Title</small>
						<small>Description</small>
						<small>Year</small>
						<small>Fuel</small>
						<small>Km</small>
						<small>Price</small>
						<span className={styles['row-actions']}></span>
					</div>
					<div className={styles['items']}>
						{items.map((item, index) => {
							return (
								<div key={index}>
									<span>{item.title}</span>
									<span>{item.summary}</span>
									<span>{item.year}</span>
									<span>{item.fuel}</span>
									<span>{item.km}</span>
									<span>{item.price}</span>
									<span className={styles['row-actions']}>
										<button onClick={() => { setForm && setForm(['ArticleForm', item]) }}>Edit </button>
										<button onClick={() => {
											fetch(`/api/articles/${item.id || item._id}`, {
												method: 'DELETE',
												credentials: 'same-origin',
												headers: {
													'Accept': 'application/json'
												}
											})
												.then((r) => {
													r.ok && reload()
												})
												.catch((err) => {
													console.log(err)
												})
										}}>Delete</button>
									</span>
								</div>
							)
						})}
					</div>
					{!loading && <div><PaginationControls pagination={pagination} /></div>}
				</main>
				<FormController form={form} data={formData} onClose={(success) => {
					setForm([])
					if (success) {
						reload && reload()
						// window.dispatchEvent(new Event('API:UPDATED'))
					}
				}} />
		</>
	)
}

export default CatalogManager