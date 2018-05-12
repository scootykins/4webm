'use strict'

import keycode from 'keycode'
import fscreen from 'fscreen'
import Player from './player'
import returnTo4chan from './chan/return'
import { $, interact } from './util'

const controls = {
  next: 'right',
  prev: 'left',
  toggle: 'space',
  fullscreen: 'f',
  loop: 'l',
  mute: 'm',
  lowerVolume: 'down',
  raiseVolume: 'up'
}
const player = new Player({
  video: $('#player'),
  playlist: $('#playlist')
})

player.state.on('change', (state) => {
  console.log(state)

  $('#status').innerHTML = `${state.index + 1} / ${state.total}`
  $('#filename').innerHTML = `${state.title}.webm`
  $('#filename').href = state.url
  $('#loop').checked = state.loop
})

player.remote.register(controls)

document.body.addEventListener('keydown', (e) => {
  const ignore = ['space', 'up', 'down']

  if (ignore.includes(keycode(e))) {
    e.preventDefault()
  }
})

if (fscreen.fullscreenEnabled) {
  $('#fullscreen').classList.remove('hide')

  interact('#fullscreen', 'click', () => {
    fscreen.requestFullscreen($('#player'))
  })
}

async function init () {
  if (window.location.pathname !== '/') {
    await player.load(window.location.href)
  }
}
init()

interact('#thread-form', 'submit', async () => {
  await player.load($('#thread-url').value)
  player.play()
})

interact('#next', 'click', () => {
  player.next()
})

interact('#prev', 'click', () => {
  player.prev()
})

interact('#show-goto', 'click', () => {
  $('#goto').classList.toggle('hide')
  $('#goto-input').focus()
})

interact('#return', 'click', () => {
  returnTo4chan()
})

interact('#gen-playlist', 'click', () => {
  $('#thread-form').classList.remove('hide')
  $('#togglePostFormLink').classList.add('hide')
  $('#thread-url').focus()
})

interact('#goto', 'submit', () => {
  player.play($('#goto-input').value - 1)
})

interact('#update', 'click', async () => {
  await player.load(window.location.href)
})
