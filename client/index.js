const axios = require('axios')
const $ = x => document.querySelector(x)
const $player = $('#player')
const $source = $('#player-source')
const $playlist = $('#playlist')
const urlRegex = /http:\/\/boards.4chan.org\/(.*)\/thread\/(.*)/

let index
let webms

$player.addEventListener('canplay', $player.play)
$player.addEventListener('ended', playNext)
$('#submit-url').addEventListener('click', loadThread)
$('#thread-form').addEventListener('submit', e => {
  e.preventDefault()
  loadThread()
})
$('#gen-playlist').addEventListener('click', () => {
  $('#thread-form').classList.remove('hide')
  $('#togglePostFormLink').classList.add('hide')
})


function loadThread () {
  const url = $('#thread-url').value
  const [, board, threadNo] = urlRegex.exec(url)

  axios.get(`/enqueue/${board}/${threadNo}`)
    .then(res => makePlaylist(res.data))
    .catch(console.log)
}

function loadVideo () {
  Array.from($playlist.childNodes)
    .filter(x => x.tagName === 'A')
    .forEach((elem, i) => {
      if (index === i) {
        elem.classList.add('current-video')
      } else {
        elem.classList.remove('current-video')
      }
    })

  $source.src = webms[index].url
  $player.load()
}

function makePlaylist (newWebms) {
  webms = newWebms
  index = 0
  resetPlaylistDOM()
  
  if (webms.length > 0) {
    generatePlaylistDOM(webms)
    loadVideo()
  }
}

function playNext () {
  index += 1
  if (index == webms.length) {
    index = 0
  }
  loadVideo()
}

function generatePlaylistDOM (webms) {
  webms.forEach((elem, i) => {
    const $a = document.createElement('a')

    $a.id = i
    $a.innerHTML = `${i+1}. ${elem.filename}.webm`
    $a.addEventListener('click', _ => {
      index = i 
      loadVideo()
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
