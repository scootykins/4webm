'use strict'

const path = require('path')
const { Router } = require('express')

const router = Router()

router.get('/:board/:thread/:filename', (req, res) => {
  const { board, thread, filename } = req.params
  res.sendFile(path.join(__dirname, `../thumbnail/${board}/${thread}/${filename}`))
})

module.exports = router
