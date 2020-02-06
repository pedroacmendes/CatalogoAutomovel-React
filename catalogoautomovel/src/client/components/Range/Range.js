import React from 'react'
import styles from './Range.module.sass'

const Range = (props) => {
	const { value=0, min=0, max=10, step=1, ...attributes } = props
	const percentage = Math.min(max, Math.max(min, value)) / max * 100
	return (
		<div className={ styles['root'] }>
			<small className={ styles['labels'] }>{ min }</small>
			<div className={ styles['input-container'] }>
				<input
					type="range"
					value={ value }
					min={ min }
					max={ max }
					step={ step }
					{ ...attributes }
				/>
				<div className={ styles['range-input'] } >
					<span className={ styles['value-marker'] } style={ { width: `${ percentage }%` } } />
					<span className={ styles['thumb'] } data-value={ value } style={ { left: `${ percentage }%` } } />
				</div>
			</div>
			<small className={ styles['labels'] }>{ max }</small>
		</div>
	)
}

export default Range