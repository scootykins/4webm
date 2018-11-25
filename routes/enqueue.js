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

async function downloadThumbnails (dir, urls) {
  await fs.ensureDir(dir)

  const thumbnails = await fs.readdir(dir)
  const thumbnailsToDownload = urls.length - thumbnails.length

  if (thumbnailsToDownload === 0) {
    console.log('Images cached! No thumbnails downloaded')
  } else {
    const downloadPromises = urls
      .slice(-thumbnailsToDownload)
      .map(x => download(x, dir))

    await Promise.all(downloadPromises)

    console.log(`${urls.length} thumbnails downloaded!`)
  }
}

router.get('/:board/thread/:threadNo', async (req, res) => {
  const reg = /https:\/\/i\.4cdn\.org\/(.*)\/(.*)/g
  const { board, threadNo } = req.params
  const dir = path.join(__dirname, `../thumbnail/${board}/${threadNo}`)

  let webmJson
  let thumbnailJson

  try {
    webmJson = await throttledListWebms(board, threadNo, { https: true })
    thumbnailJson = webmJson.webms.map(webm => webm.thumbnail)
  } catch (err) {
    res.status(404).send(err.message)

    return
  }

  try {
    await downloadThumbnails(dir, thumbnailJson)
  } catch (err) {
    console.error(`Failed to download thumbnails: ${err}`)
  }

  webmJson.webms.forEach((webm) => {
    webm.url = `/proxy/${encodeURIComponent(webm.url)}`
    webm.thumbnail = webm.thumbnail.replace(reg, `/thumbnail/${board}/${threadNo}/$2`)
  })

  res.json(webmJson)
})

module.exports = router
