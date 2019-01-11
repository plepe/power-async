module.exports = class Iterator {
  constructor (tasks, options, callback) {
    this.options = Object.assign({
      limit: 0
    }, options)
    this.callback = callback

    this.tasks = tasks

    this.pointer = 0
    this.activeCount = 0

    this._run()
  }

  _callback (index) {
    if (this.tasks[index].done) {
      console.error('callback has already been called!')
    } else {
      this.activeCount--
    }

    this.tasks[index].done = true

    if (this.pending) {
      global.setTimeout(this._run.bind(this), 0)
      this.pending = false
    }
  }

  _run () {
    console.log('run')
    this.pending = false

    while (this.pointer < this.tasks.length) {
      let task = this.tasks[this.pointer]
      task(this._callback.bind(this, this.pointer))
      this.pointer++
      this.activeCount++

      if (this.options.limit > 0 && this.activeCount >= this.options.limit) {
        this.pending = true
        return
      }
    }

    this.callback()
  }

  abort () {
  }
}
