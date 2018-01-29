const { Router } = require('express')
const home = require('./home')
const enqueue = require('./enqueue')
const thumbnail = require('./thumbnail')

function getRouter (redis) {
  const router = Router()

  router.use('/', home)
  router.use('/enqueue', enqueue(redis))
  router.use('/thumbnail', thumbnail)

  return router
}

module.exports = getRouter
