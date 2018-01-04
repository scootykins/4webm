const listWebms = require('4chan-list-webm')
const router = require('express').Router()

router.get('/:board/:threadNo', (req, res) => {
  const { board, threadNo } = req.params
  listWebms(board, threadNo, res.send.bind(res))
})

module.exports = router
