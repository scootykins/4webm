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
    raiseVolume,
    lowerVolume
  } = buttons

  const handler = (e) => {
    e.preventDefault()

    const key = keycode(e)

    if (key === toggle) {
      if (player.state.paused) {
        player.play()
      } else {
        player.pause()
      }
    } else if (key === next) {
      player.next()
    } else if (key === prev) {
      player.prev()
    } else if (key === loop) {
      player.toggleLoop()
    } else if (key === lowerVolume) {
      player.$video.volume -= 10 / 100
    } else if (key === raiseVolume) {
      player.$video.volume += 10 / 100
    } else if (key === fullscreen && fscreen.fullscreenEnabled) {
      if (fscreen.fullscreenElement !== null) {
        fscreen.exitFullscreen()
      } else {
        fscreen.requestFullscreen(player.$video)
      }
    }
  }

  document.body.removeEventListener('keyup', handler)
  document.body.addEventListener('keyup', handler)
}

export default registerRemote
