class Playlist {
  constructor ($playlist) {
    this._$playlist = $playlist
    this._$imgs = []
  }

  gen (filenames, thumbnails, handler) {
    filenames.forEach((filename, i) => {
      const $a = document.createElement('a')
      const $img = document.createElement('img')

      $a.innerHTML = `${i + 1}. ${filename}.webm`
      $a.addEventListener('click', () => handler(i))

      $img.src = thumbnails[i]

      this._$playlist.appendChild($a)
      this._$playlist.appendChild($img)
      this._$playlist.appendChild(document.createElement('br'))
    })
  }

  update (index, classname = 'active') {
    Array.from(this._$playlist.childNodes)
      .filter(x => x.tagName === 'A')
      .forEach((elem, i) => {
        if (index === i) {
          elem.classList.add(classname)
        } else {
          elem.classList.remove(classname)
        }
      })
  }

  reset () {
    while(this._$playlist.firstCild) {
      this._$playlist.removeChild(this._$playlist.firstChild)
    }
  }

  showThumbnails () {
    $imgs.forEach(($img) => {
      $img.classList.remove('hide')
    })
  }

  hideThumbnails () {
    $imgs.forEach(($img) => {
      $img.classList.add('hide')
    })
  }
}

export default Playlist
