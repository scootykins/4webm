'use strict'

import { createClamp } from '../../util'

class Seeker {
  constructor ($video, step = 0.10) {
    this._$video = $video
    this.step = step
  }

  _clamp (val) {
    return createClamp(0, this._$video.duration)(val)
  }

  forward () {
    if (this._$video.readyState > 0) {
      const { currentTime, duration } = this._$video
      this._$video.currentTime = this._clamp(currentTime + duration * this.step)
    }
  }

  backward () {
    if (this._$video.readyState > 0) {
      const { currentTime, duration } = this._$video
      this._$video.currentTime = this._clamp(currentTime - duration * this.step)
    }
  }
}

export default Seeker
