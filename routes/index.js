'use strict'

const { Router } = require('express')

const router = Router()

router.use('/enqueue', require('./enqueue'))
router.use('/thumbnail', require('./thumbnail'))

module.exports = router
