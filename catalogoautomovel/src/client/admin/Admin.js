import React from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import Login from './controllers/Login/Login'
import CatalogManager from './controllers/CatalogManager/CatalogManager'
import useSession from '../hooks/useSession'

const Admin = () => {
	const [session] = useSession()
	const { pathname } = useLocation()
	if (!session && pathname !== '/admin/login') {
		return <Redirect to='/admin/login' />
	}
	return (
		<Switch>
			<Route path="/admin/login">
				<Login />
			</Route>
			<Route path="/admin">
				<CatalogManager />
			</Route>
		</Switch>
	)
}

export default Admin