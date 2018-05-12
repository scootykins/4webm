'use strict'

import keycode from 'keycode'
import fscreen from 'fscreen'

class Remote {
  constructor (player) {
    this._player = player
  }

  register (buttons) {
    const {
      toggle,
      next,
      prev,
      fullscreen,
      loop,
      mute,
      raiseVolume,
      lowerVolume
    } = buttons

    const handler = (e) => {
      e.preventDefault()

      switch (keycode(e)) {
        case toggle:
          if (this._player.state.paused) {
            this._player.play()
          } else {
            this._player.pause()
          }
          break
        case next:
          this._player.next()
          break
        case prev:
          this._player.prev()
          break
        case loop:
          this._player.toggleLoop()
          break
        case lowerVolume:
          this._player.speaker.lower()
          break
        case raiseVolume:
          this._player.speaker.raise()
          break
        case mute:
          this._player.speaker.toggle()
          break
        case fullscreen:
          if (fscreen.fullscreenEnabled) {
            if (fscreen.fullscreenElement !== null) {
              fscreen.exitFullscreen()
            } else {
              fscreen.requestFullscreen(this._player.getVideoElement())
            }
          }
          break
      }
    }

    document.body.removeEventListener('keyup', handler)
    document.body.addEventListener('keyup', handler)
  }
}

export default Remote
