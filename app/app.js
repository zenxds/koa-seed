const config = require('config')
const log4js = require('log4js')
const Koa = require('koa')
const app = new Koa()

// 对koa app进行扩展
app.keys = config.get('keys')
app.isProduction = /production/.test(process.env.NODE_ENV)

// logger
log4js.configure(require('../config/log4js'))
app.logger = log4js.getLogger('app')
app.errorLogger = log4js.getLogger('error')

module.exports = app
