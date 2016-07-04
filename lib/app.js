require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import tables from './db_tables.js'
import error_handler from './error_handler.js'
import config from './config.js'
const app = express()
const isProd = config.env.isProduction


// Initialize apps dependencies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.listen(process.env.PORT || 8081)


// Create database tables
tables.create(configure_routes)

// Mount routes from controllers
import { hashtag } from './routes'
import { user } from './routes'
import { oauth } from './routes'

function configure_routes () {
  app.use('/hashtag', hashtag)
  app.use('/user', user)
  app.use('/auth', oauth)
  // 404 Error Handling
  app.use((req, res, next) => {
    res.status(404)
      .send('The resource you are requesting is currently unavailable')
  });
}
  