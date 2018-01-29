function collector (arr) {
  return function collect (key) {
    return arr.map(obj => obj[key])
  }
}

module.exports = {
  Collector: collector
}
