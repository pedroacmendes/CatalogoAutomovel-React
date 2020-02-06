import React from 'react'

import * as forms from './'

import styles from './Forms.module.sass'

const FormController = (props) => {
	const { form, data, onClose } = props
	const Form = forms[form]
	return (
		<>
			{ Form && <div onClick={ () => { onClose && onClose() } } className={ styles['backdrop'] } /> }
			{ Form && (
				<div className={ styles['form-container'] }>
					<Form data={ data } onSuccess={ onClose }/>
				</div>
			 ) }
		</>
	)
}

export default FormController
