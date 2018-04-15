'use strict'

const path = require('path')
const express = require('express')
const routes = require('./routes/index')
const enforce = require('express-sslify')

const app = express()

app.enable('trust proxy')
app.set('view engine', 'hbs')
app.use(routes)
app.use(express.static(path.join(__dirname, './static')))

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
}

module.exports = app
