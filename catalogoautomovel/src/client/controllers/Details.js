import React from 'react'
import styles from './details.module.sass'
import useApi from '../hooks/useApi'
import Footer from "../components/Footer/Footer"
import { useParams } from 'react-router-dom'
import DetailsCard2 from '../components/cards/DetailsCard2/DetailsCard'

const Details = () => {

	const { articleId } = useParams()
	console.log(articleId)
	const [data, loading, error] = useApi(`/api/articles/${articleId}`)

	return (
		<>
			<header className={styles['header']}>
				<h2> Detalhes do carro</h2>
			</header>
			<main>
				{loading && <div>Loading...</div>}
				{error && <div>{error.message || 'Error'}</div>}
				{data && (
					<section className={styles['section']} >
						<h2> {data.title} </h2> <br></br>
						<DetailsCard2 key={0} item={data} />
						<br></br>
						<div className={styles['items-1']}>
							<h3>Title</h3>
							<small>{data.title}</small>
						</div>
						<div className={styles['items-1']}>
							<h3>Description</h3>
							<small>{data.summary}</small>
						</div>
						<div className={styles['items-1']}>
							<h3>Year</h3>
							<small>{data.year}</small>
						</div>
						<div className={styles['items-1']}>
							<h3>Fuel</h3>
							<small>{data.fuel}</small>
						</div>
						<div className={styles['items-1']}>
							<h3>Km</h3>
							<small>{data.km}</small>
						</div>
						<div className={styles['items-1']}>
							<h3>Price</h3>
							<small>{data.price}</small>
						</div>
					</section>
				)}

			</main>
			<Footer />

		</>
	)
}

export default Details