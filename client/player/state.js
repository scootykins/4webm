'use strict'

import Reactor from './reactor'

class State {
  constructor (init, reactor) {
    Object.assign(this, init)
    this._reactor = new Reactor()
  }

  on (...args) {
    this._reactor.on(...args)
  }

  _emit (...args) {
    this._reactor.emit(...args)
  }

  set (partial) {
    Object.assign(this, partial)
    this._emit('change', this)
  }
}

export default State
