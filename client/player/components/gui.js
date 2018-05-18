'use strict'

import fscreen from 'fscreen'
import { returnTo4chan, regex } from '../../util'

class GUI {
  constructor (player) {
    this._player = player
  }

  register (dom) {
    const interact = (d, event, handler, allowDefault) => {
      if (d) {
        d.addEventListener(event, e => {
          if (!allowDefault) {
            e.preventDefault()
          }

          handler(e)
        })
      }
    }

    const {
      goto,
      gotoShow,
      gotoInput,
      chanReturn,
      genPlaylist,
      next,
      prev,
      update,
      threadForm,
      threadFormShow,
      threadUrl,
      fullscreen,
      loop,
      filename,
      status
    } = dom

    interact(gotoShow, 'click', () => {
      goto.classList.toggle('hide')
      gotoInput.focus()
    })

    interact(chanReturn, 'click', () => {
      returnTo4chan()
    })

    interact(next, 'click', () => {
      this._player.next()
    })

    interact(prev, 'click', () => {
      this._player.prev()
    })

    interact(loop, 'click', () => {
      this._player.toggleLoop()
    }, true)

    interact(threadForm, 'submit', () => {
      const url = threadUrl.value
      const [,, board, threadNo, fragment] = regex.thread.exec(url)
      const baseUrl = `${window.location.protocol}//${window.location.host}`
      const endpoint = `${board}/thread/${threadNo}`
      const appUrl = fragment
        ? `${baseUrl}/${endpoint}#${fragment}`
        : `${baseUrl}/${endpoint}`

      this._player.load(url)

      window.history.pushState('', '', appUrl)
    })

    interact(genPlaylist, 'click', () => {
      threadForm.classList.remove('hide')
      threadFormShow.classList.add('hide')
      threadUrl.focus()
    })

    interact(update, 'click', () => {
      this._player.load(window.location.href)
    })

    if (fscreen.fullscreenEnabled) {
      fullscreen.classList.remove('hide')

      interact(fullscreen, 'click', () => {
        fscreen.requestFullscreen(this._player.getVideoElement())
      })
    }

    this._player.state.on('change', (state) => {
      status.innerHTML = `${state.index + 1} / ${state.total}`
      filename.innerHTML = `${state.title}.webm`
      filename.href = state.url
      loop.checked = state.loop
    })
  }
}

export default GUI
