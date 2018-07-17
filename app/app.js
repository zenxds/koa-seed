const config = require('config')
const log4js = require('log4js')
const Koa = require('koa')
const app = new Koa()

// logger
log4js.configure(require('../config/log4js'))

// 对app进行扩展
Object.assign(app, {
  isProduction: /production/.test(process.env.NODE_ENV),

  keys: config.get('keys'),

  logger: log4js.getLogger('app'),

  errorLogger: log4js.getLogger('error')
})

app.on('error', (err, ctx) => {
  app.errorLogger.error(`${ctx.path}: ${err.message}`)
})

module.exports = app
