import React from 'react'

import styles from './DetailsCard.module.sass'

const STORAGE = (process.env.REACT_APP_STORAGE || '')

const DetailsCard = (props) => {
	const { item = {} } = props

	//const link = "/catalog/"+(item.id)

	const imgSource = (item.images || [])[0]
	const style = {
		backgroundImage: imgSource ? `url(${ STORAGE }${ encodeURI(imgSource) })` : undefined
	}
	return (
		<div className={ styles['root'] }>
			<div className={ styles['thumb'] } style={ style } />
		</div>
	)
}

export default DetailsCard
