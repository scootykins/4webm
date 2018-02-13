'use strict'

import Player from './player'
import { $ } from './util'

const player = new Player({
  video: $('#player'),
  source: $('#player-source'),
  status: $('#status'),
  playlist: $('#playlist')
})

if (window.location.pathname !== '/') {
  player.load(window.location.pathname)
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
})

$('#goto').addEventListener('submit', e => {
  e.preventDefault()
  player.play($('#goto-input').value - 1)
})

$('#gen-playlist').addEventListener('click', e => {
  e.preventDefault()
  $('#thread-form').classList.remove('hide')
  $('#togglePostFormLink').classList.add('hide')
})
