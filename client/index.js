'use strict'

import keycode from 'keycode'
import fscreen from 'fscreen'
import Player from './player'
import boards from '4chan-boards'
import { $, interact, getBoardFromUrl, returnTo4chan, getSelectedOpt } from './util'
import styles from './vendor'
import icon from './assets/favicon.ico'
import iconBlue from './assets/favicon-blue.ico'

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
  let board
  const style = getSelectedOpt($('#styleSelector'))

  if (window.location.pathname !== '/') {
    await player.load(window.location.href)
    board = getBoardFromUrl(window.location.href)
  }

  if (board && boards.getType(board) === boards.SFW) {
    $('#icon').href = iconBlue
  } else {
    $('#icon').href = icon
  }

  if (style !== 'auto') {
    setStyle(styles[style])
  } else if (board && boards.getType(board) === boards.SFW) {
    setStyle(styles['yotsublue'])
  } else {
    setStyle(styles['yotsuba'])
  }
}
init()

interact('#styleSelector', 'change', (e) => {
  const style = $('#styleSelector').value

  if (style !== 'auto') {
    setStyle(styles[style])
  }
})

function setStyle (url) {
  $('#switch').href = url
}

interact('#thread-form', 'submit', () => {
  player.load($('#thread-url').value)
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
  player.goto($('#goto-input').value - 1)
})

interact('#update', 'click', () => {
  player.load(window.location.href)
})
