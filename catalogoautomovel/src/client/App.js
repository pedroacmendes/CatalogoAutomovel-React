import React from 'react'
import styles from './App.module.sass'
import Menu from './components/Menu/Menu'

import { useLocation, Switch, Route } from 'react-router-dom'

import Homepage from './controllers/Homepage'
import Catalog from './controllers/Catalog'
import Details from './controllers/Details'

const App = () => {
	const { pathname } = useLocation()
	return (
		<div className={ styles['app'] }>
			<Menu translucent={ pathname === '/' } />
			<Switch>
				<Route path="/" exact><Homepage /></Route>
				<Route path="/catalog" exact><Catalog /></Route>
				<Route path="/articles/:articleId" exact><Details /></Route>
			</Switch>
		</div>
	)
}

export default App



