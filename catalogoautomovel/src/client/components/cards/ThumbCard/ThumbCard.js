import React from 'react'

import styles from './ThumbCard.module.sass'

const STORAGE = (process.env.REACT_APP_STORAGE || '')

const ThumbCard = (props) => {
	const { aspectRatio, item } = props
	const aspect = (typeof aspectRatio !== 'string' ? '16:9' : aspectRatio).split(':')
	const paddingTop = aspect.length === 2 ? (parseInt(aspect[1], 10) / parseInt(aspect[0], 10) * 100) : undefined
	const imgSource = (item.images || [])[0]
	const style = {
		paddingTop: paddingTop ? `${ paddingTop }%` : undefined,
		backgroundImage: imgSource ? `url(${ STORAGE }${ encodeURI(imgSource) })` : undefined
	}
	return (
		<div className={ styles['root'] }>
			<div className={ styles['thumb'] } style={ style } />
			<div className={ styles['details'] }>
				<h4>{ item.title }</h4>
			</div>
		</div>
	)
}

export default ThumbCard