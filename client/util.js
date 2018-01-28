export function $ (selector) {
  return document.querySelector(selector)
}

export function collector (arr) {
  return function collect (key) {
    return arr.map(obj => obj[key])
  }
}

