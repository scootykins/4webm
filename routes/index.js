const router = require('express').Router()

router.use('/', require('./home'))
router.use('/enqueue', require('./enqueue'))

module.exports = router
