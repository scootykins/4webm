const path = require('path')
const express = require('express')
const app = express()
const routes = require('./routes/index')

app.enable('trust proxy')
app.use(routes)
app.use(express.static(path.join(__dirname, './static')))

module.exports = app
