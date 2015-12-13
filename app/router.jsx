import React from 'React'
import { Router, Route, IndexRoute } from 'react-router'
import App from './components/App'

export default function router(history){
	return (
		<Router history={history}>
			<Route path="/" component={App}></Route>
		</Router>
	)
}