'use strict'

import { createClamp } from '../util'

const clamp = createClamp(0, 1)

class Speaker {
  constructor ($video) {
    this._$video = $video
  }

  raise () {
    this._$video.volume = clamp(this._$video.volume + 0.1)
  }

  lower () {
    this._$video.volume = clamp(this._$video.volume - 0.1)
  }

  toggle () {
    this._$video.muted = !(this._$video.muted)
  }
}

export default Speaker
