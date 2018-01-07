const axios = require('axios')
const $ = x => document.querySelector(x)
const $player = $('#player')
const $source = $('#player-source')
const $playlist = $('#playlist')
const urlRegex = /http:\/\/boards.4chan.org\/(.*)\/thread\/(.*)/

let index
let webms

$('#submit-url').addEventListener('click', () => {
  const url = $('#thread-url').value
  const [, board, threadNo] = urlRegex.exec(url)

  axios.get(`/enqueue/${board}/${threadNo}`)
    .then(res => makePlaylist(res.data))
    .catch(console.log)
})

$player.addEventListener('canplay', $player.play)
$player.addEventListener('ended', playNext)

function makePlaylist (newWebms) {
  webms = newWebms
  index = 0
  resetPlaylistDOM()
  
  if (webms.length > 0) {
    generatePlaylistDOM(webms)
    $source.src = webms[index].url 
    $player.load()
    console.log(index)
  }
}

function playNext () {
  index += 1
  if (index == webms.length) {
    index = 0
  }
  $source.src = webms[index].url
  $player.load()
  console.log(index)
}

function generatePlaylistDOM (webms) {
  webms.forEach((elem, i) => {
    const $a = document.createElement('a')

    $a.id = i
    $a.innerHTML = `${i+1}. ${elem.filename}.webm`
    $a.addEventListener('click', _ => {
      index = i 
      $source.src = webms[index].url
      $player.load()
      console.log(index)
    })
    $playlist.appendChild($a)
    $playlist.appendChild(document.createElement('br'))
  })
}

function resetPlaylistDOM () {
  while ($playlist.firstChild) {
    $playlist.removeChild($playlist.firstChild)
  }
}
