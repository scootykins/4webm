const path = require('path')
const router = require('express').Router()

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

router.get('/:board/thread/:threadNo', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

module.exports = router
