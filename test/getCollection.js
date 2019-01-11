const assert = require('assert')

const getCollection = require('../src/getCollection')

describe('getCollection', function () {
  it ('array', function () {
    let coll = getCollection([ 'a', 'b', 'c' ])
    assert.deepEqual(coll, [
      { key: 0, value: 'a' },
      { key: 1, value: 'b' },
      { key: 2, value: 'c' }
    ])
  })

  it ('object', function () {
    let coll = getCollection({ a: 'a', b: 'b', c: 'c' })
    assert.deepEqual(coll, [
      { key: 'a', value: 'a' },
      { key: 'b', value: 'b' },
      { key: 'c', value: 'c' }
    ])
  })
})
