
import React from 'react'
import { useHistory } from 'react-router-dom'

import styles from './PaginationControls.module.css'

const PaginationControls = (props) => {
	const history = useHistory()
	const { pagination } = props
	const { page, hasMore, total, pageSize } = pagination || {}
	const totalPages = Math.ceil(total/pageSize)
	return pagination ? (
		<div className={ styles['controls'] }>
			<button
				className={ styles['button'] }
				disabled={ page === 0 }
				onClick={ () => {
					history.push({
						search: `page=${ page - 1 }`
					})
				} }
			>Prev</button>
			<span className={ styles['page'] }>{ page + 1 } / { totalPages }</span>
			<button
				className={ styles['button'] }
				disabled={ !hasMore }
				onClick={ () => {
					history.push({
						search: `page=${ page + 1 }`
					})
				} }
			>Next</button>
		</div>
	) : null
}

export default PaginationControls
