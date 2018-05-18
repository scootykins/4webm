'use strict'

import keycode from 'keycode'
import Player from './player'
import { $ } from './util'

const controls = {
  next: 'right',
  prev: 'left',
  toggle: 'space',
  fullscreen: 'f',
  loop: 'l',
  mute: 'm',
  seekForward: '.',
  seekBackward: ',',
  lowerVolume: 'down',
  raiseVolume: 'up'
}
const gui = {
  goto: $('#goto'),
  gotoShow: $('#goto-show'),
  gotoInput: $('#goto-input'),
  chanReturn: $('#return'),
  genPlaylist: $('#gen-playlist'),
  next: $('#next'),
  prev: $('#prev'),
  update: $('#update'),
  threadForm: $('#thread-form'),
  threadFormShow: $('#togglePostFormLink'),
  threadUrl: $('#thread-url'),
  fullscreen: $('#fullscreen'),
  loop: $('#loop'),
  filename: $('#filename'),
  status: $('#status')
}
const player = new Player({
  video: $('#player'),
  playlist: $('#playlist')
})

player.remote.register(controls)
player.gui.register(gui)

player.state.on('change', (state) => {
  console.log(state)
})

if (window.location.pathname !== '/') {
  player.load(window.location.href)
}

document.body.addEventListener('keydown', (e) => {
  const ignore = ['space', 'up', 'down']

  if (ignore.includes(keycode(e))) {
    e.preventDefault()
  }
})
