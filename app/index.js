const config = require('config')
const { Application } = require('the-rang')

const app = new Application({
  keys: config.get('keys'),
  plugins: config.get('plugins'),
  db: config.get('db')
})

module.exports = app
