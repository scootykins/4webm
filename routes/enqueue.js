const fs = require('fs')
const path = require('path')
const { Router } = require('express')
const { RateLimiter } = require('limiter')
const { Collector } = require('../util/collection')
const { promisify } = require('util')
const download = require('download')
const listWebms = require('4chan-list-webm')
const WEEK = 1000 * 60 * 60 * 24 * 7

const unlinkAsync = promisify(fs.unlink)
const limiter = new RateLimiter(1, 1000)

function getRouter (redis) {
  const router = Router()

  router.get('/:board/thread/:threadNo', (req, res) => {
    const { board, threadNo } = req.params


    limiter.removeTokens(1, () => {
      listWebms(board, threadNo, (webms) => {
        const reg = /http:\/\/i\.4cdn\.org\/(.*)\/(.*)/g
        const collect = Collector(webms)
        const thumbnails = collect('thumbnail')
        const thumbnailPaths = []

        webms.forEach((webm) => {
          webm.thumbnail = webm.thumbnail.replace(reg, `/thumbnail/$2`)
          thumbnailPaths.push(`../thumbnail/${webm.thumbnail}`)
        })

        redis.get(`${board}/${threadNo}`, (err, reply) => {
          if (reply === 'CACHED') {
            console.log('Images cached: no download')
            res.send(webms)
            return
          }

          Promise.all(thumbnails.map(x => download(x, path.join(__dirname, '../thumbnail'))))
            .then(() => {
              console.log('Downloaded images!')
              res.send(webms)
              redis.set(`${board}/${threadNo}`, 'CACHED')

              setTimeout(() => {
                Promise.all(thumbnailPaths.map(x => unlinkAsync(x))).then(() => {
                  console.log('Deleted images')
                })
              }, WEEK)
            })
        })
      })
    })
  })

  return router
}

module.exports = getRouter
