import * as axios from 'axios'

class Player {
  constructor (dom) {
    this._dom = dom
    this._index = 0
    this._webms = []

    this._dom.video.addEventListener('canplay', this._dom.video.play)
    this._dom.video.addEventListener('ended', this.next.bind(this))
  }

  load (threadUrl) {
    const threadRegex = /http:\/\/boards.4(webm|chan).org\/(.*)\/(.*)/
    const [,, board, threadNo] = threadRegex.exec(threadUrl)

    this._resetPlaylist()

    axios.get(`/enqueue/${board}/${threadNo}`)
      .then(res => {
        this._webms = res.data
        this._genPlaylist()
        this.goto(0)
      })
      .catch(console.log)
  }

  play () {
    this._dom.source.src = this._webms[this._index].url
    this._currPlaylist()
    this._dom.video.load()
  }

  goto (index) {
    this._index = index
    this.play()
  }

  next () {
    if (this._webms.length - 1 > this._index) {
      this.goto(this._index + 1)
    } else {
      this.goto(0)
    }
  }

  prev () {
    if (this._index > 0) {
      this.goto(this._index - 1)
    } else {
      this.goto(this._webms.length - 1)
    }
  }

  _genPlaylist () {
    this._webms.forEach((elem, i) => {
      const a = document.createElement('a')

      a.id = this._index
      a.innerHTML = `${i + 1}. ${elem.filename}.webm`
      a.addEventListener('click', () => {
        this._index = i
        this.play()
      })

      this._dom.playlist.appendChild(a)
      this._dom.playlist.appendChild(document.createElement('br'))
    })
  }

  _currPlaylist () {
    Array.from(this._dom.playlist.childNodes)
      .filter(x => x.tagName === 'A')
      .forEach((elem, i) => {
        if (this._index === i) {
          elem.classList.add('current-video')
        } else {
          elem.classList.remove('current-video')
        }
      })
  }

  _resetPlaylist () {
    while (this._dom.playlist.firstChild) {
      this._dom.playlist.removeChild(this._dom.playlist.firstChild)
    }
  }
}

export default Player
