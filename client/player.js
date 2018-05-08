'use strict'

import * as axios from 'axios'
import boards from '4chan-boards'
import Playlist from './playlist'
import Reactor from './reactor'
import { collector } from './util'

class Player {
  /**
   * Create a 4webm player
   * @param {object}  dom
   * @param {Element} dom.video
   * @param {Element} dom.playlist
   */
  constructor (dom) {
    this.$video = dom.video
    this._state = {
      index: 0,
      total: 0,
      loop: false,
      title: '',
      url: '',
      paused: false
    }

    this._webmUrls = []
    this._filenames = []
    this._playlist = new Playlist(dom.playlist)
    this._reactor = new Reactor()

    this.$video.addEventListener('canplay', this.$video.play)
    this.$video.addEventListener('ended', this.next.bind(this))
  }

  async load (threadUrl) {
    const threadRegex = /(.*)\/(.*)\/thread\/(\d*)(?:#(\d*))?/g
    const [,, board, threadNo, fragment] = threadRegex.exec(threadUrl)
    let res

    this._playlist.flash('Loading...')

    try {
      res = await axios.get(`/enqueue/${board}/thread/${threadNo}`)
    } catch (err) {
      this._playlist.flash('Failed to get thread data, are you sure it exists?')
      console.error(err)

      return
    }

    document.title = [
      `/${board}/`,
      res.data.subject,
      boards.getName(board),
      '4webm'
    ].join(' - ')
    const collect = collector(res.data.webms)

    this._webmUrls = collect('url')
    this._filenames = collect('filename')
    this._playlist.gen(
      this._filenames,
      collect('thumbnail'),
      res.data.subject,
      this.play.bind(this)
    )

    const index = fragment && Number(fragment) <= this._webmUrls.length
      ? Number(fragment) - 1
      : 0

    this.state = { total: this._webmUrls.length }
    this.play(index)
  }

  play (index) {
    this.state = { paused: false }

    if (index < this._webmUrls.length && index >= 0) {
      this.state = {
        index,
        title: this._filenames[index],
        url: this._webmUrls[index]
      }

      this.$video.src = this._webmUrls[index]
      window.location.hash = index + 1
      this._playlist.update(index)
      this.$video.load()
    } else {
      this.$video.play()
    }
  }

  pause () {
    this.state = { paused: true }
    this.$video.pause()
  }

  next () {
    if (this._webmUrls.length - 1 > this.state.index) {
      this.play(this.state.index + 1)
    } else {
      this.play(0)
    }
  }

  prev () {
    if (this.state.index > 0) {
      this.play(this.state.index - 1)
    } else {
      this.play(this._webmUrls.length - 1)
    }
  }

  toggleLoop () {
    this.state = { loop: !(this.state.loop) }
    this.$video.loop = this.state.loop
  }

  on (...args) {
    this._reactor.on(...args)
  }

  _emit (...args) {
    this._reactor.emit(...args)
  }

  get state () {
    return this._state
  }

  set state (partial) {
    Object.assign(this._state, partial)
    this._emit('change', this.state)
  }
}

export default Player
