'use strict'

class Reactor {
  constructor () {
    this._events = {}
  }

  on (event, handler) {
    if (this._events[event]) {
      this._events[event].push(handler)
    } else {
      this._events[event] = [handler]
    }
  }

  emit (event, data) {
    this._events[event].forEach(handler => handler(data))
  }
}

export default Reactor
