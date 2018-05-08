'use strict'

import keycode from 'keycode'
import fscreen from 'fscreen'
import Player from './player'
import registerRemote from './remote'
import { $ } from './util'

const remote = {
  next: 'right',
  prev: 'left',
  toggle: 'space',
  fullscreen: 'f',
  loop: 'l',
  lowerVolume: 'down',
  raiseVolume: 'up'
}
const player = new Player({
  video: $('#player'),
  playlist: $('#playlist')
})

player.on('change', (state) => {
  console.log(state)

  $('#status').innerHTML = `${state.index + 1} / ${state.total}`
  $('#filename').innerHTML = `${state.title}.webm`
  $('#filename').href = state.url
  $('#loop').checked = state.loop
})

registerRemote(remote, player)

document.body.addEventListener('keydown', (e) => {
  const ignore = ['space', 'up', 'down']

  if (ignore.includes(keycode(e))) {
    e.preventDefault()
  }
})

if (fscreen.fullscreenEnabled) {
  $('#fullscreen').classList.remove('hide')
  $('#fullscreen').addEventListener('click', e => {
    e.preventDefault()
    fscreen.requestFullscreen($('#player'))
  })
}

if (window.location.pathname !== '/') {
  player.load(window.location.href)
}

$('#thread-form').addEventListener('submit', e => {
  e.preventDefault()
  player.load($('#thread-url').value)
})

$('#next').addEventListener('click', e => {
  e.preventDefault()
  player.next()
})

$('#prev').addEventListener('click', e => {
  e.preventDefault()
  player.prev()
})

$('#show-goto').addEventListener('click', e => {
  e.preventDefault()
  $('#goto').classList.toggle('hide')
  $('#goto-input').focus()
})

$('#goto').addEventListener('submit', e => {
  e.preventDefault()
  player.play($('#goto-input').value - 1)
})

$('#gen-playlist').addEventListener('click', e => {
  e.preventDefault()
  $('#thread-form').classList.remove('hide')
  $('#togglePostFormLink').classList.add('hide')
  $('#thread-url').focus()
})
