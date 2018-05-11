'use strict'

export function createClamp (min, max) {
  return (num) => Math.min(max, Math.max(min, num))
}

export function $ (selector) {
  return document.querySelector(selector)
}

export function collector (arr) {
  return function collect (key) {
    return arr.map(obj => obj[key])
  }
}
