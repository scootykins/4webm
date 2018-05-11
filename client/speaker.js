'use strict'

class Speaker {
  constructor ($video) {
    this._$video = $video
  }

  raise () {
    this._$video.volume += 0.1
  }

  lower () {
    this._$video.volume -= 0.1
  }

  toggle () {
    this._$video.muted = !(this._$video.muted)
  }
}

export default Speaker
