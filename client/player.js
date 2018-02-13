'use strict'

import * as axios from 'axios'
import Playlist from './playlist'
import { collector } from './util'

class Player {
  constructor (dom) {
    this._$video = dom.video
    this._$source = dom.source
    this._$status = dom.status
    this._$save = dom.save
    this._index = 0
    this._webmUrls = []
    this._playlist = new Playlist(dom.playlist)
    this._thumbnails = false

    this._$video.addEventListener('canplay', this._$video.play)
    this._$video.addEventListener('ended', this.next.bind(this))
  }

  load (threadUrl) {
    const threadRegex = /(.*)\/(.*)\/thread\/(.*)/g
    const [,, board, threadNo] = threadRegex.exec(threadUrl)

    this._playlist.reset()

    axios.get(`/enqueue/${board}/thread/${threadNo}`)
      .then(res => {
        const collect = collector(res.data)
        this._webmUrls = collect('url')
        this._playlist.gen(
          collect('filename'),
          collect('thumbnail'),
          this.play.bind(this)
        )
        this.play(0)
      })
      .catch(console.log)
  }

  play (index) {
    if (index < this._webmUrls.length && index >= 0) {
      this._index = index
      this._play()
    }
  }

  next () {
    if (this._webmUrls.length - 1 > this._index) {
      this.play(this._index + 1)
    } else {
      this.play(0)
    }
  }

  prev () {
    if (this._index > 0) {
      this.play(this._index - 1)
    } else {
      this.play(this._webmUrls.length - 1)
    }
  }

  showThumbnails () {
    this._thumbnails = true
    this._playlist.showThumbnails()
  }

  hideThumbnails () {
    this._thumbnails = false
    this._playlist.hideThumbnails()
  }

  set loop (toggle) {
    this._$video.loop = toggle
  }

  _play () {
    this._$source.src = this._webmUrls[this._index]
    this._$save.href = this._webmUrls[this._index]
    this._$status.innerHTML = `${this._index + 1} / ${this._webmUrls.length}`
    this._playlist.update(this._index)
    this._$video.load()
  }
}

export default Player
