'use strict'

const path = require('path')
const { Router } = require('express')
const boards = require('4chan-boards')

const router = Router()

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

router.get('/:board/thread/:threadNo', (req, res) => {
  const { board } = req.params
  switch (boards.getType(board)) {
    case boards.NSFW:
      res.sendFile(path.join(__dirname, '../views/index.html'))
      break
    case boards.ADMIN:
    case boards.SFW:
      res.sendFile(path.join(__dirname, '../views/sfw.html'))
      break
    default:
      res.sendFile(path.join(__dirname, '../views/invalid.html'))
      break
  }
})

module.exports = router
