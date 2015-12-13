'use strict'

import React from 'react'
import Router from 'react-router'
import createLocation from 'history/lib/createLocation'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import { RoutingContext, match } from 'react-router'
import { renderToString } from 'react-dom/server'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import { default as appRouter } from '../../app/router'
import { default as reducer } from '../../app/state/reducers/'


// Redux store creator, called within each isomophic request handler.
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

let history = createMemoryHistory()
let routes = appRouter(history)

function isomorphicHandler(req, res, next){
  // Create Redux store with initial state (to inject into the returned html)
  let initialState = req.state || {}
  let store = createStoreWithMiddleware(reducer, initialState)
  
  let location = createLocation(req.originalUrl)

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if(!error && !redirectLocation && !renderProps){
      return res.status(500).send('No matching route');
    } else if (error){
      return next(error.message)
    } else if (redirectLocation) {
      return res.redirect(redirectLocation.pathname)    
    } else if (!renderProps == null) {
      return next('No renderProps for route')
    }

    let markup = renderToString(
      <Provider store={store}>
        <RoutingContext {...renderProps}/>
      </Provider>
    )

    res.setHeader('Content-Type', 'text/html');
    res.render('pages/index', {
    	markup: markup,
    	initialState: initialState
    })

  });
}

export default isomorphicHandler