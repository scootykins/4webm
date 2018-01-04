const axios = require('axios')
const $ = x => document.querySelector(x)
const $player = $('#player')
const $source = $('#player-source')
const urlRegex = /http:\/\/boards.4chan.org\/(.*)\/thread\/(.*)/

let playlist
let i

$('#submit-url').addEventListener('click', () => {
  const url = $('#thread-url').value
  const [, board, threadNo] = urlRegex.exec(url)

  axios.get(`/enqueue/${board}/${threadNo}`)
    .then(res => makePlaylist(res.data))
    .catch(console.log)
})

$player.addEventListener('ended', () => {
  i += 1
  if (i == playlist.length) {
    i = 0
  }
  $source.src = playlist[i].url
  $player.load()
})

$player.addEventListener('canplay', $player.play)

function makePlaylist (webms) {
  i = 0
  playlist = webms
  if (playlist.length > 0) {
    $source.src = playlist[0].url 
    $player.load()
  }
}
