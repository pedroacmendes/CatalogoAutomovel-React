import React from 'react'
import styles from './Header.module.sass'
import AdvancedSearchInput from '../AdvancedSearchInput/AdvancedSearchInput'

const Header = () => {
	return (
		<div className={styles['root']}>
			<div className={styles['content']}>
				<div className={styles['details']}>
					<h1>We have the bestest cars</h1>
				</div>
				<div className={styles['search-input-container']}>
					<div>
						<AdvancedSearchInput />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
