module.exports = function getCollection (coll) {
  if (Array.isArray(coll)) {
    return coll.map((value, key) => {
      return { key, value }
    })
  } else {
    let keys = Object.keys(coll)
    return keys.map(key => { return { key, value: coll[key] }})
  }
}
