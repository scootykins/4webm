'use strict'

const { Router } = require('express')

const router = Router()

router.use('/', require('./home'))
router.use('/enqueue', require('./enqueue'))
router.use('/thumbnail', require('./thumbnail'))

module.exports = router
