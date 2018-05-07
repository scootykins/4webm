'use strict'

const { Router } = require('express')
const boards = require('4chan-boards')
const { bannerMsgs, invalidMsg } = require('../util/messages')

const router = Router()
const defaultLocals = {
  global_style: '/yotsuba.css',
  style: '/style.css',
  favicon: '/favicon.ico',
  messages: [...bannerMsgs]
}
const blueLocals = {
  global_style: '/yotsuba-blue.css',
  style: '/style-blue.css',
  favicon: '/favicon-blue.ico',
  messages: [...bannerMsgs]
}

router.get('/', (req, res) => {
  res.render('index', defaultLocals)
})

router.get('/:board/thread/:threadNo', (req, res) => {
  const { board } = req.params
  let locals

  switch (boards.getType(board)) {
    case boards.NSFW:
      locals = defaultLocals
      break
    case boards.ADMIN:
    case boards.SFW:
      locals = blueLocals
      break
    default:
      locals = Object.assign({}, defaultLocals, {
        messages: [invalidMsg, ...bannerMsgs]
      })
      break
  }

  res.render('index', locals)
})

module.exports = router
