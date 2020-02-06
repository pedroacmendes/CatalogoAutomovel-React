import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './client/index.sass'
import App from './client/App'
import Admin from './client/admin/Admin'
import * as serviceWorker from './client/serviceWorker'

ReactDOM.render(
	<Router>
		<Switch>
			<Route path="/admin"><Admin /></Route>
			<Route path="*"><App /></Route>
		</Switch>
	</Router>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
