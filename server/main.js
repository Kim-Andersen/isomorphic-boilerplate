'use strict'

import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import packageJson from '../package'
import router from './router'

const packageConfig = packageJson.config
//const mongoConnection = packageConfig.appMongoConnection
const host = packageConfig.appServerHost
const port = packageConfig.appServerPort
const appBaseUrl = `${packageConfig.appBaseUrl}`
const appBublicPath = packageConfig.appPublicPath

//mongoose.connect(mongoConnection);

let app = express()

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(router({
  appBublicPath: appBublicPath
}))

app.listen(port, host);

export default app;