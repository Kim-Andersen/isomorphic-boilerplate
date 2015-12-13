'use strict'

import express from 'express'
import thunkMiddleware from 'redux-thunk'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import compression from 'compression'
import passport from 'passport'
import path from 'path'

import isomorphicHandler from './isomorphicHandler'

let opt = {
	appBublicPath: '../build'
}

function getDefautRouter(){
	let router = express.Router({mergeParams: true});

	router.use(express.static(path.resolve(opt.appBublicPath)))
	router.use(morgan('dev'));
	router.use(compression());
	router.use(bodyParser.urlencoded({'extended': true}));
	router.use(bodyParser.json());
	router.use(methodOverride());
	//router.use(cookieParser(COOKIE_PARSER_SECRET)); // secret value can be anything.

	/*let mongoStore = MongoStore(session);
	router.use(session({
	  resave: true,
	  saveUninitialized: true,
	  secret: '5r(e_$V18_b3.dy', // secret can be anything.
	  store: new mongoStore({
	    mongooseConnection: mongoose.connection
	  })
	}));*/

	//router.use(passport.initialize());
	//router.use(passport.session());
	//router.use(authentication());

	return router
}





function router(options){
	opt = options

	let router = getDefautRouter();

	router.get('*', isomorphicHandler)

	// Error handling
	router.use(function errorHandler(err, req, res, next) {
    console.log('errorHandler', err.stack);
    res.status(500).send({ message: 'Server error', error: err });
  });

	return router
}

export default router
