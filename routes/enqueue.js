'use strict'

const fs = require('fs-extra')
const path = require('path')
const { Router } = require('express')
const download = require('download')
const listWebms = require('4chan-list-webm')
const Bottleneck = require('bottleneck')

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1000
})
const router = Router()
const throttledListWebms = limiter.wrap(listWebms)

router.get('/:board/thread/:threadNo', (req, res) => {
  const reg = /http:\/\/i\.4cdn\.org\/(.*)\/(.*)/g
  const { board, threadNo } = req.params
  const dir = path.join(__dirname, `../thumbnail/${board}/${threadNo}`)

  fs.ensureDir(dir)
    .then(Promise.all([
      throttledListWebms(board, threadNo),
      fs.readdir(dir)
    ]))
    .then((arr) => {
      const [webms, files] = arr
      const thumbnails = webms.map(obj => obj['thumbnail'])
      const filesToDownload = thumbnails.length - files.length

      webms.forEach((webm) => {
        webm.thumbnail = webm.thumbnail.replace(reg, `/thumbnail/${board}/${threadNo}/$2`)
      })

      if (filesToDownload === 0) {
        res.send(webms)        
        return 'Images cached - no downloads needed'
      } else {
        const downloadPromises = thumbnails.slice(-filesToDownload).map(x => download(x, dir))
        return Promise.all(downloadPromises).then(() => 'Images downloaded!')
      }
    })
    .then(console.log)
})

module.exports = router
