import { regex } from '../util'

function returnTo4chan () {
  const [,, board, threadNo] = regex.thread.exec(window.location.href)
  const url = `https://boards.4chan.org/${board}/thread/${threadNo}`

  window.location.href = url
}

export default returnTo4chan
