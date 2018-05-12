'use strict'

import * as axios from 'axios'
import boards from '4chan-boards'
import Playlist from './playlist'
import Remote from './remote'
import State from './state'
import Speaker from './speaker'
import { regex, collector } from '../util'

class Player {
  /**
   * Create a 4webm player
   * @param {object}  dom
   * @param {Element} dom.video
   * @param {Element} dom.playlist
   */
  constructor (dom) {
    this._$video = dom.video
    this.speaker = new Speaker(this._$video)
    this.remote = new Remote(this)
    this.state = new State({
      index: 0,
      total: 0,
      loop: false,
      title: '',
      url: '',
      paused: true
    })

    this._webmUrls = []
    this._filenames = []
    this._playlist = new Playlist(dom.playlist)

    this._$video.addEventListener('canplay', this._$video.play)
    this._$video.addEventListener('ended', this.next.bind(this))
  }

  /**
   * Fetch thread data
   * @async load
   * @param {string} threadUrl
   */
  async load (threadUrl) {
    const [,, board, threadNo, fragment] = regex.thread.exec(threadUrl)
    let res

    this._playlist.flash('Loading...')

    try {
      res = await axios.get(`/enqueue/${board}/thread/${threadNo}`)
    } catch (err) {
      this._playlist.flash('Failed to get thread data, are you sure it exists?')
      console.error(err)

      return
    }

    const collect = collector(res.data.webms)

    this._webmUrls = collect('url')
    this._filenames = collect('filename')
    this._playlist.gen(
      this._filenames,
      collect('thumbnail'),
      res.data.subject,
      (i) => this.play(i, false)
    )

    const index = fragment && Number(fragment) <= this._webmUrls.length
      ? Number(fragment) - 1
      : 0

    document.title = [
      `/${board}/`,
      res.data.subject,
      boards.getName(board),
      '4webm'
    ].join(' - ')
    this._playlist.update(index)
    this.state.set({ index, total: this._webmUrls.length })

    if (this._$video.src === '') {
      this._$video.src = this._webmUrls[index]
    }
  }

  /**
   * @method play
   * @param {number}  index  Index of the video to play
   * @param {boolean} [snap=true]   Determines whether playlist will auto scroll
   */
  play (index, snap = true) {
    this.state.set({ paused: false })

    if (index < this._webmUrls.length && index >= 0) {
      this.state.set({
        index,
        title: this._filenames[index],
        url: this._webmUrls[index]
      })

      this._$video.src = this._webmUrls[index]
      window.history.replaceState(null, null, `#${index + 1}`)
      this._playlist.update(index, snap)
      this._$video.load()
    } else {
      this.play(this.state.index)
    }
  }

  pause () {
    this.state.set({ paused: true })
    this._$video.pause()
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
    this.state.set({ loop: !(this.state.loop) })
    this._$video.loop = this.state.loop
  }

  getVideoElement () {
    return this._$video
  }
}

export default Player
