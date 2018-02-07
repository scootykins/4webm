'use strict'

const { Router } = require('express')
const boards = require('4chan-boards')
const { welcomeMsg, invalidMsg } = require('../util/messages')

const router = Router()

router.get('/', (req, res) => {
  res.render('index', {
    global_style: '/yotsuba.css',
    style: '/style.css',
    messages: [welcomeMsg]
  })
})

router.get('/:board/thread/:threadNo', (req, res) => {
  const { board } = req.params
  let locals

  switch (boards.getType(board)) {
    case boards.NSFW:
      locals = { 
        global_style: '/yotsuba.css',
        style: '/style.css',
        messages: [welcomeMsg]
      }
      break
    case boards.ADMIN:
    case boards.SFW:
      locals = {
        global_style: '/yotsuba-blue.css',
        style: '/style-blue.css',
        messages: [welcomeMsg]
      }
      break
    default:
      locals = {
        global_style: '/yotsuba.css',
        style: '/style.css',
        messages: [invalidMsg, welcomeMsg]
      }
      break
  }

  res.render('index', locals)
})

module.exports = router
