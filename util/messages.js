const bannerMsgs = [
  '** Right now it seems 4chan sends error 403s when making a cross-origin request; I\'m working on a fix **',
  `You can also load a thread by replacing '4chan' with '4webm' in a thread URL and visiting it`,
  `Keyboard shortcuts: Left/right -> prev/next, up/down -> volume, spacebar -> pause/play, l -> loop, f -> fullscreen`
]

const invalidMsg = `
INVALID BOARD SHORT NAME IN THREAD URL
`

module.exports = { bannerMsgs, invalidMsg }
