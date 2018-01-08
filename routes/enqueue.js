const listWebms = require('4chan-list-webm')
const RateLimiter = require('limiter').RateLimiter
const router = require('express').Router()
const limiter = new RateLimiter(1, 1000)

router.get('/:board/:threadNo', (req, res) => {
  const { board, threadNo } = req.params
  
  limiter.removeTokens(1, () => {
    listWebms(board, threadNo, res.send.bind(res))
  })
})

module.exports = router
