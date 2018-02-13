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
  player.next()
})

$('#prev').addEventListener('click', e => {
  player.prev()
})

$('#show-goto').addEventListener('click', e => {
  $('#goto').classList.toggle('hide')
})

$('#goto').addEventListener('submit', e => {
  e.preventDefault()
  player.play($('#goto-input').value - 1)
})

$('#gen-playlist').addEventListener('click', () => {
  $('#thread-form').classList.remove('hide')
  $('#togglePostFormLink').classList.add('hide')
})
