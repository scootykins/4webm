'use strict'

const { Router } = require('express')
const axios = require('axios')

const router = Router()

router.get('/:url', (req, res) => {
  const url = decodeURIComponent(req.params.url)
  const filename = decodeURIComponent(req.query.f)

  axios.get(url, {
    responseType: 'stream'
  })
    .then((stream) => {
      stream.headers['Content-Disposition'] = `attachment; filename=${filename}.webm`
      res.writeHead(stream.status, stream.headers)
      stream.data.pipe(res)
    })
    .catch(err => {
      console.error(err.message)

      res.status(500).send({ message: 'Failed to proxy video' })
    })
})

module.exports = router
