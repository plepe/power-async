const assert = require('assert')

const powerAsync = require('../src/powerAsync')

describe('each', function () {
  it ('array - sync', function (done) {
    let stat = powerAsync.each(
      [ 'a', 'b', 'c' ],
      {
      },
      (value, index, callback) => {
        callback()
      },
      (err) => {
        done()
      }
    )

    console.log(stat)
  })

  it ('array - async', function (done) {
    let stat = powerAsync.each(
      [ 'a', 'b', 'c' ],
      {
      },
      (value, index, callback) => {
        global.setTimeout(callback, 0)
      },
      (err) => {
        done()
      }
    )

    console.log(stat)
  })

  it ('array - sync limit=1', function (done) {
    let stat = powerAsync.each(
      [ 'a', 'b', 'c' ],
      {
        limit: 1
      },
      (value, index, callback) => {
        callback()
      },
      (err) => {
        done()
      }
    )

    console.log(stat)
  })

  it ('array - async limit=1', function (done) {
    let stat = powerAsync.each(
      [ 'a', 'b', 'c' ],
      {
        limit: 1
      },
      (value, index, callback) => {
        global.setTimeout(callback, 0)
      },
      (err) => {
        done()
      }
    )

    console.log(stat)
  })
})
