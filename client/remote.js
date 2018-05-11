'use strict'

import keycode from 'keycode'
import fscreen from 'fscreen'

function registerRemote (buttons, player) {
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
        if (player.state.paused) {
          player.play()
        } else {
          player.pause()
        }
        break
      case next:
        player.next()
        break
      case prev:
        player.prev()
        break
      case loop:
        player.toggleLoop()
        break
      case lowerVolume:
        player.speaker.lower()
        break
      case raiseVolume:
        player.speaker.raise()
        break
      case mute:
        player.speaker.toggle()
        break
      case fullscreen:
        if (fscreen.fullscreenEnabled) {
          if (fscreen.fullscreenElement !== null) {
            fscreen.exitFullscreen()
          } else {
            fscreen.requestFullscreen(player.$video)
          }
        }
        break
    }
  }

  document.body.removeEventListener('keyup', handler)
  document.body.addEventListener('keyup', handler)
}

export default registerRemote
