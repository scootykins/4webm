'use strict'

import keycode from 'keycode'
import fscreen from 'fscreen'

function registerRemote (buttons, player) {
  const { toggle, next, prev, fullscreen, loop } = buttons

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
    } else if (key === fullscreen) {
      if (fscreen.requestFullscreen) {
        fscreen.requestFullscreen(player.$video)
      }
    }
  }

  document.body.removeEventListener('keyup', handler)
  document.body.addEventListener('keyup', handler)
}

export default registerRemote
