import * as axios from 'axios'
import Playlist from './playlist'
import { collector } from './util'

class Player {
  constructor (dom) {
    this._$video = dom.video
    this._$source = dom.source
    this._index = 0
    this._webmUrls = []
    this._playlist = new Playlist(dom.playlist)
    this._thumbnails = false

    this._$video.addEventListener('canplay', this._$video.play)
    this._$video.addEventListener('ended', this.next.bind(this))
  }

  load (threadUrl) {
    const threadRegex = /http:\/\/boards.4(webm|chan).org\/(.*)\/(.*)/
    const [,, board, threadNo] = threadRegex.exec(threadUrl)

    this._playlist.reset()

    axios.get(`/enqueue/${board}/${threadNo}`)
      .then(res => {
        const collect = collector(res.data)
        this._webmUrls = collect('url')
        this._playlist.reset()
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
    this._playlist.update(index)
    this._index = index
    this._play()
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

  _play () {
    this._$source.src = this._webmUrls[this._index]
    this._playlist.update(this._index)
    this._$video.load()
  }
}

export default Player
