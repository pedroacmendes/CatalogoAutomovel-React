import React from 'react'
import styles from './Footer.module.sass'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className={styles['footer']}>
            <h2 className={styles['aaaa']}>Catálogo Automotivo</h2>

            <span className={styles['logo-container']}>
                <Link to="/"><span className={styles['logo']} /></Link>
            </span>
            <Link className={styles['links']} to="/catalog"> Catálogo de Carros </Link>
            <Link className={styles['links']} to="/admin/login"> Login </Link>

        </div>
    )
}

export default Header
