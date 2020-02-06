import React from 'react'
import styles from './Menu.module.sass'
import { NavLink, Link } from 'react-router-dom'

const Menu = (props) => {
	const { translucent } = props
	return (
		<div className={`${styles['root']} ${translucent ? styles['is-translucent'] : ''}`}>
			<div className={styles['content']}>
				<span>
					<span className={styles['logo-container']}>
						<Link to="/"><span className={styles['logo']} /></Link>
					</span>
				</span>
				<span>
					<div className={styles['menu-links']}>
						<NavLink to="/" exact activeClassName={styles['is-active']}><strong>Homepage</strong></NavLink>
						<NavLink to="/catalog" activeClassName={styles['is-active']}><strong>Catalog</strong></NavLink>
						<NavLink to="/admin" activeClassName={styles['is-active']}><strong>Admin</strong></NavLink>
					</div>
					<button className={styles['burger-menu']}> burger</button>
				
				</span>
			</div>
		</div>
	)
}

export default Menu

