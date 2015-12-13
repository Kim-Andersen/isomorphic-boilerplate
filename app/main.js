'use strict'

//require('babel-core').polyfill()

require("babel-polyfill");
import React from 'react'
import ReactDom from 'react-dom'
import { createHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { default as reducer } from './state/reducers/'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import router from './router'

// Grab the state from a global injected into server-generated HTML.
const initialState = window.__STATE__

// Init ApiClient.
/*ApiClient.init({
	baseUrl: 'http://localhost:3000/api', 
	timeout: 5000,
	headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': initialState.session && initialState.session.apiToken
  }
});*/

// init redux logger
const loggerMiddleware = createLogger()

// Redux middelware store creator
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore)

// Create Redux store
const store = createStoreWithMiddleware(reducer, initialState)

const history = createHistory();

ReactDom.render(
	<Provider store={store}>
		{router(history)}
	</Provider>,
	document.getElementById('app')
);