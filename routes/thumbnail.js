'use strict'

const path = require('path')
const { Router } = require('express')

const router = Router()

router.get('/:board/:thread/:filename', (req, res) => {
  const { board, thread, filename } = req.params
  const thumbnailPath = path.join(__dirname, `../thumbnail/${board}/${thread}/${filename}`)
  res.sendFile(path.join(__dirname, thumbnailPath))
})

module.exports = router
