import React, { useState, useEffect } from 'react'

import useCreateApi from '../../hooks/useCreateApi'

import styles from './Forms.module.sass'

const ArticleForm = (props) => {
	const { onSuccess, data: propsData } = props
	const stateData = propsData || { title: '', summary: '', tags: '', year: "" , fuel: "" , km: "", price: "" , images: [], props: { readTime: 10 } }
	const [data, setData] = useState(stateData)
	const [uploading, setUploading] = useState(false)
	const [uploadError, setUploadError] = useState(false)
	const [createOrUpdate, submitting, success, error] = useCreateApi('/api/articles', onSuccess)

	useEffect(() => {
		if (success) {
			onSuccess && onSuccess(true)
		}
	}, [success, onSuccess])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!submitting) {
			createOrUpdate(data)
		}
	}
	return (
		<div className={ styles['form'] }>
			<form onSubmit={ handleSubmit }>
				<div className={ styles['form-header'] }>
					<button type="button" onClick={ () => { onSuccess && onSuccess() } }><strong>Close</strong></button>
					<button primary="true" type="submit"><strong>Save</strong></button>
				</div>
				<div className={ styles['form-content'] }>
					{ error && <div className={ styles['form-error'] }><small>{ error.message }</small></div> }
					<label className={ styles['text-input'] }>
						<div className={ styles['text-label'] }>
							<strong>Title</strong>
						</div>
						<input
							type='text'
							name='title'
							placeholder='Add a title'
							value={ data.title }
							onChange={ (e) => {
								setData({
									...data,
									title: e.target.value
								})
							} }
						/>
					</label>
					<label className={ styles['text-input'] }>
						<div className={ styles['text-label'] }>
							<strong>Summary</strong>
						</div>
						<textarea
							type='text'
							name='summary'
							placeholder='Add a summary'
							value={ data.summary }
							onChange={ (e) => {
								setData({
									...data,
									summary: e.target.value
								})
							} }
						/>
					</label>
					<label className={ styles['text-input'] }>
						<div className={ styles['text-label'] }>
							<strong>Read Time</strong>
						</div>
						<input
							type='text'
							name='readTime'
							placeholder='Add read time (m)'
							value={ data.props.readTime }
							onChange={ (e) => {
								setData({
									...data,
									props: {
										...data.props,
										readTime: e.target.value
									}
								})
							} }
						/>
					</label>
					<label className={ styles['text-input'] }>
						<div className={ styles['text-label'] }>
							<strong>Tags</strong>
						</div>
						<input
							type='text'
							name='tags'
							placeholder='Add tags (comma separated values)'
							value={ data.tags }
							onChange={ (e) => {
								setData({
									...data,
									tags: e.target.value
								})
							} }
						/>
					</label>
					<label className={ styles['text-input'] }>
						<div className={ styles['text-label'] }>
							<strong>Year</strong>
						</div>
						<input
							type='text'
							name='year'
							placeholder='Add year'
							value={ data.year }
							onChange={ (e) => {
								setData({
									...data,
									year: e.target.value
								})
							} }
						/>
					</label>
					<label className={ styles['text-input'] }>
						<div className={ styles['text-label'] }>
							<strong>Fuel</strong>
						</div>
						<input
							type='text'
							name='fuel'
							placeholder='Add fuel'
							value={ data.fuel }
							onChange={ (e) => {
								setData({
									...data,
									fuel: e.target.value
								})
							} }
						/>
					</label>
					<label className={ styles['text-input'] }>
						<div className={ styles['text-label'] }>
							<strong>Km</strong>
						</div>
						<input
							type='text'
							name='km'
							placeholder='Add km (comma separated values)'
							value={ data.km }
							onChange={ (e) => {
								setData({
									...data,
									km: e.target.value
								})
							} }
						/>
					</label>
					<label className={ styles['text-input'] }>
						<div className={ styles['text-label'] }>
							<strong>Price</strong>
						</div>
						<input
							type='text'
							name='price'
							placeholder='Add price (comma separated values)'
							value={ data.price }
							onChange={ (e) => {
								setData({
									...data,
									price: e.target.value
								})
							} }
						/>
					</label>

					<div>
						<div className={ styles['text-label'] }>
							<strong>Images</strong>
						</div>
						<div className={ styles['images-container'] }>
							{
								data.images.map((src, index) => (
									<div key={ index }>
										<div className={ styles['image-thumb'] }>
											<img src={ src } alt='' />
										</div>
										<button
											type='button'
											onClick={ () => {
												let imgs = [...data.images]
												imgs.splice(index, 1)
												setData({
													...data,
													images: imgs
												})
											} }
										>delete</button>
									</div>
								))
							}
						</div>
						<input
							type='file'
							name='images'
							placeholder='Choose files'
							onChange={ (e) => {
								if (!uploading) {
									setUploading(true)
									const file = e.target.files[0]
									const formData = new FormData()
									formData.append('file', file)
									e.target.value = ''
									fetch('/api/upload', {
										method: 'POST',
										headers: {
											'Accepts': 'application/json'
										},
										body: formData
									})
										.then((r) => {
											if (r.ok) {
												try {
													return r.json()
												} catch (_) {
													return null
												}
											} else {
												setUploadError({
													status: r.status,
													message: r.statusText
												})
											}
										})
										.then((r) => {
											if (r && r.url) {
												setData({
													...data,
													images: [
														...data.images,
														r.url
													]
												})
											}
											setUploading(false)
										})
										.catch((e) => {
											console.log('error', e)
											setUploading(false)
											setUploadError({
												status: 500,
												message: e.toString && e.toString()
											})
										})
								}

							} }
						/>
					</div>
				</div>
			</form>
		</div>
	)
}

export default ArticleForm
