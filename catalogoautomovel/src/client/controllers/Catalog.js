import React, { useState } from 'react'
import Grid from '../components/Grid/Grid'
import Footer from "../components/Footer/Footer"
import styles from './layout.module.sass'
import useApi from '../hooks/useApi'
import { useLocation } from 'react-router-dom'
import { parse } from 'query-string'
import Range from '../components/Range/Range'
import DetailsCard from '../components/cards/DetailsCard/DetailsCard'
import { Link } from 'react-router-dom'
import PaginationControls from '../components/PaginationControls/PaginationControls'
import FormController from '../admin/forms/FormController'

const Catalog = () => {
	const error = null
	const [searchData, setSearchData] = useState({ years: 0, location: '', tags: ['highlights', 'homepage'] })
	const { search } = useLocation()
	const [data, setData] = useState({ list: [] })
	if(!`${searchData.title}`) {
		fetch(`api/articles`)
			.then(r => r.json())
			.then((r) => {
				setData(r)
			})
	}
	const [[form, formData], setForm] = useState([])
	const parseParams = parse(search, { arrayFormat: 'comma' })
	const filters = {
		...parseParams,
		page_size: undefined,
		page: undefined
	}

	const [ loading, reload] = useApi(`/api/articles`, parseParams.page_size || 12, parseParams.page || 0, filters, true)
	const { data2 = [], pagination = {} } = data || {}
	const items = !error ? (data || { list: [] }).list || [] : []
	const handleSubmit = (e) => {
		e.preventDefault()
	}

	

	return (
		<>
			<header className={styles['header']}>
				<h2>Catálogo Automóvel</h2>
			</header>
			<div className={`${styles['max-width']} ${styles['aside-col']}`}>

				<div>
					<Grid cols={[1, 1, 1]}>
						{items.map((item, index) => (
							<Link className={styles['title']} to={`articles/${item.id}`}  >
								<DetailsCard key={index} className={styles['repeat']} item={item} />
							</Link>
						))}
					</Grid>

					{!loading && <div><PaginationControls pagination={pagination} /></div>}
	
				</div>

				<FormController form={form} data={formData} onClose={(success) => {
					setForm([])
					if (success) {
						reload && reload()
						// window.dispatchEvent(new Event('API:UPDATED'))
					}
				}} />

				<div>
					<div className={styles['aside-header']}><small>Filters</small></div>
					<form onSubmit={handleSubmit}>
						<div>
							<h4 className={styles['aside-title']}>Number of years </h4>
							<Range
								value={searchData.years}
								min="0"
								max="6"
								onChange={(e) => {
									setSearchData({
										...searchData,
										years: e.target.value
									})
								}}
							/>
						</div>
						<div>
							<h4 className={styles['aside-title']}>Cars name</h4>
							<input
								type="text"
								placeholder="ex. Porsche"
								name="location"
								value={searchData.title}
								onChange={(e) => {
									setSearchData({
										...searchData,
										title: e.target.value
									})
								}}
								onKeyUp={(e) => {
									e.preventDefault()
									if((`${searchData.title}`) != 0) {
										fetch(`api/articles?q=${searchData.title}`)
										.then(r => r.json())
										.then((r) => {
											setData(r)
										})
									}
								}
								}
								/>
						</div>
						<div className={styles['actions']}>
							<button type="submit" className={styles['search-button']}><b>Find</b></button>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Catalog