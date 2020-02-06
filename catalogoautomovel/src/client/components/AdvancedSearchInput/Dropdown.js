import React, { useState } from 'react'

import styles from './Dropdown.module.sass'

const arrow = (
	<svg width="32px" height="32px" viewBox="0 0 32 32">
		<polygon points="22.0312739 18.2247308 16.7755756 23.4803575 16.7755756 5 14.737104 5 14.737104 23.4815741 9.48069007 18.2247308 8.03928946 19.6665608 15.7561967 27.3826092 23.4730323 19.6665608"/>
	</svg>
)

const Dropdown = (props) => {
	const { className, value, options, onChange } = props
	const [open, setOpen] = useState(false)
	return (
		<div className={ `${ styles['root'] } ${ className || '' }` }>
			{ open && <div className={ styles['options'] }>{
				(options || []).map((option, index) => {
					return (
						<div
							key={ index }
							value={ option.id }
							onClick={ (e) => {
								setOpen(!open)
								setTimeout((v) => {
									onChange && onChange(v)
								}, 0, e.target.getAttribute('value'))
							} }
						>{ option.name }</div>
					)
				})
			}</div> }
			<button
				type="button"
				className={ styles['button'] }
				onClick={ () => { setOpen(!open) } }
			>
					<span>{ value }</span>
					<span className={ styles['icon'] }>{ arrow }</span>
			</button>
		</div>
	)
}

export default Dropdown
