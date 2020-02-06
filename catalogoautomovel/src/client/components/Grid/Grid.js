import React, { Children } from 'react'
import styles from './Grid.module.sass'

const Grid = (props) => {
	const { className, cols = [], children = [] } = props
	const numberOfCols = cols.reduce((acc, colSpan) => acc += colSpan, 0)
	const childArray = Children.toArray(children)
	const items = childArray.map((child, index) => {
		const colSpan = cols[index % cols.length]
		const size = Math.round((((100 / numberOfCols) * colSpan) * 100)) / 100
		return (
			<div key={ index } style={ { flexBasis: `${ size }%` } }>
				{ child }
			</div>
		)
	})
	return (
		<div className={ `${ styles['root'] } ${ className || '' }` }>
			<div className={ styles['grid'] }>
				{ items }
			</div>
		</div>
	)
}

export default Grid
