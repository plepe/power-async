const Iterator = require('./Iterator')
const getCollection = require('./getCollection')

function each (coll, options, iteratee, callback) {
  let entries = getCollection(coll)

  console.log(entries)
  let tasks = entries.map(entry => iteratee.bind(this, entry.value, entry.key))

  return new Iterator(tasks, options, callback)
}

module.exports = {
  each
}
