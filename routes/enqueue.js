const { promisify } = require('util')
const { RateLimiter } = require('limiter')
const collector = require('../util/collection')
const fs = require('fs')
const path = require('path')
const download = require('download')
const delay = require('timeout-as-promise')
const listWebms = require('4chan-list-webm')
const router = require('express').Router()

const unlinkAsync = promisify(fs.unlink)
const limiter = new RateLimiter(1, 1000)

router.get('/:board/thread/:threadNo', (req, res) => {
  const { board, threadNo } = req.params

  limiter.removeTokens(1, () => {
    listWebms(board, threadNo, (webms) => {
      const reg = /http:\/\/i\.4cdn\.org\/(.*)\/(.*)/g
      const collect = collector(webms)
      const thumbnails = collect('thumbnail')

      Promise.all(thumbnails.map(x => download(x, path.join(__dirname, '../thumbnail'))))
        .then(() => {
          const thumbnailPaths = []
          console.log('files downloaded!')
          webms.forEach(elem => {
            elem.thumbnail = elem.thumbnail.replace(reg, '/thumbnail/$2')
            thumbnailPaths.push(path.join(__dirname, `..${elem.thumbnail}`))
          })
          res.send(webms)
          
          delay('60000').then(() => {
            Promise.all(thumbnailPaths.map(x => unlinkAsync(x))).then(() => {
              console.log('deleted all images')
            })
          })
        })
    })
  })
})

module.exports = router
