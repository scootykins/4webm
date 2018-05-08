'use strict'

class Reactor {
  constructor () {
    this._events = {}
  }

  on (event, handler) {
    this._events[event] = handler
  }

  emit (event, data) {
    this._events[event](data)
  }
}

export default Reactor
