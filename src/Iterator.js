const { PerformanceObserver, performance } = require('perf_hooks')

module.exports = class Iterator {
  constructor (tasks, options, callback) {
    this.options = Object.assign({
      limit: 0,
      timeLimit: 0
    }, options)
    this.callback = callback

    this.tasks = tasks

    this.pointer = 0
    this.activeCount = 0

    this._run()
  }

  _callback (index) {
    let task = this.tasks[index]

    if (task.done) {
      console.error('callback has already been called!')
    } else {
      task.endTime = performance.now()
      this.activeCount--
    }

    task.done = true

    if (this.pending) {
      global.setTimeout(this._run.bind(this), 0)
      this.pending = false
    }
  }

  _run () {
    if (this.finished) {
      console.error('iteration already finished, should not call _run again!')
    }

    this.pending = false
    let runStartTime = performance.now()

    while (this.pointer < this.tasks.length) {
      let task = this.tasks[this.pointer]
      task.startTime = performance.now()
      task(this._callback.bind(this, this.pointer))
      task.initDoneTime = performance.now()
      this.pointer++
      this.activeCount++

      if (this.options.limit > 0 && this.activeCount >= this.options.limit) {
        this.pending = true
        return
      }

      if (this.options.timeLimit > 0 && performance.now() - runStartTime > this.options.timeLimit) {
        if (this.activeCount) {
          this.pending = true
        } else {
          global.setTimeout(this._run.bind(this), 0)
        }
        return
      }
    }

    this.finished = true
    this.callback()
  }

  abort () {
  }
}
