import Player from './player'
import { $ } from './util'

const player = new Player({
  video: $('#player'),
  source: $('#player-source'),
  playlist: $('#playlist')
})

if (window.location.pathname !== '/') {
  player.load(window.location.pathname)
}

$('#thread-form').addEventListener('submit', e => {
  e.preventDefault()
  player.load($('#thread-url').value)
})

$('#gen-playlist').addEventListener('click', () => {
  $('#thread-form').classList.remove('hide')
  $('#togglePostFormLink').classList.add('hide')
})
