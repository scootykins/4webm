const path = require('path')
const router = require('express').Router()

router.get('/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, `../thumbnail/${req.params.filename}`))
})

module.exports = router
