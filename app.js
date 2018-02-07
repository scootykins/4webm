'use strict'

const path = require('path')
const express = require('express')
const routes = require('./routes/index')

const app = express()

app.enable('trust proxy')
app.set('view engine', 'hbs')
app.use(routes)
app.use(express.static(path.join(__dirname, './static')))

module.exports = app
