const path = require('path')
const express = require('express')
const routes = require('./routes/index')

function App (redis) {
  const app = express()

  app.enable('trust proxy')
  app.use(routes(redis))
  app.use(express.static(path.join(__dirname, './static')))

  return app
}

module.exports = App
