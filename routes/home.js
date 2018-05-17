'use strict'

const { Router } = require('express')
const path = require('path')
const router = Router()

router.get('*/thread/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

module.exports = router
