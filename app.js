const path = require('path')
const express = require('express')
const app = express()
const routes = require('./routes/index')

app.use(routes)
app.use(express.static(path.join(__dirname, './static')))

module.exports = app
