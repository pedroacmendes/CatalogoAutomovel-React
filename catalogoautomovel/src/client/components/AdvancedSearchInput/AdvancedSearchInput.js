import React, { useState } from 'react'
import { stringify } from 'query-string'
import styles from './AdvancedSearchInput.module.sass'
import Dropdown from './Dropdown'
import Range from '../Range/Range'

const options = [
	{
		id: 'diesel',
		name: 'Diesel'
	},
	{
		id: 'gasolina',
		name: 'Gasolina'
	},
	{
		id: 'eletrico',
		name: 'Elétrico'
	},
	{
		id: 'hibrido',
		name: 'Hibrido'
	},
]

const AdvancedSearchInput = () => {
	const [searchData, setSearchData] = useState({ title: '', km: '', tags: ['Bmw', 'homepage'] })
	const [titleName, setTitleName] = useState(null)

	const [advancedSearch, setAdvancedSearch] = useState(false)
	const handleSubmit = (e) => {
		e.preventDefault()
		const searchString = stringify(searchData, { arrayFormat: 'comma' })
		console.log(searchString)
	}
	return (
		<div className={styles['root']}>
			{advancedSearch && (
				<form onSubmit={handleSubmit} className={styles['advanced-form']}>
					<div>
						<h5>Advanced Search</h5>
						<div>
							<h4>Number of years</h4>
							<Range
								value={searchData.tags}
								min="0"
								max="10"
								onChange={(e) => {
									setSearchData({
										...searchData,
										tags: e.target.value
									})
								}}
							/>
						</div>
						<div>
							<h4>Km</h4>
							<input
								type="text"
								placeholder="ex. 100 000 km"
								value={searchData.km}
								onChange={(e) => {
									setSearchData({
										...searchData,
										km: e.target.value
									})
								}} />
						</div>
						<div className={styles['actions']}>
							<button type="submit" className={styles['search-button']}><b>Find Advanced</b></button>
						</div>
					</div>
				</form>
			)}
			<form onSubmit={handleSubmit} className={styles['form']}>
				<div className={styles['dropdown-container']}>
					<Dropdown
						className={styles['dropdown']}
						value={titleName || 'Fuel'}
						options={options}
						onChange={(value) => {
							setTitleName(value)
						}}
					/>
				</div>
				<div className={styles['input-container']}>
					<input placeholder='Type name (Mercedes)' />
				</div>
				<button type="submit" className={styles['find-button']} onClick={() => {
						fetch(`/api/articles/${ titleName || titleName }`, {
							method: 'FindById',
							credentials: 'same-origin',
							headers: {
								'Accept': 'application/json'
							}
						})
							.then((r) => {
								r.ok ()
							})
							.catch((err) => {
								console.log(err)
							})
					} }><b>Find </b></button>
				<button type="button" className={styles['more-options']} onClick={() => { setAdvancedSearch(!advancedSearch) }}>
					Options </button>
			</form>
		</div>
	)
}

export default AdvancedSearchInput