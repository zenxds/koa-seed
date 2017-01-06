'use strict'

// suit key保存到文件里
const fs = require('fs')
const path = require('path')

class Storage {
  constructor(name) {
    this.file = path.resolve(__dirname, `../../data/${name}.json`)
  }

  get data() {
    return fs.existsSync(this.file) ? JSON.parse(fs.readFileSync(this.file, 'utf8')) : {}
  }

  get(key) {
    return this.data[key]
  }

  set(key, value) {
    const data = this.data

    if (typeof value === 'undefined') {
      Object.assign(data, key)
    } else {
      data[key] = value
    }
    fs.writeFileSync(this.file, JSON.stringify(data, null, 2), 'utf8')
  }
}

module.exports = Storage