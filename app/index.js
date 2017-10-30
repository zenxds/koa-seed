const path = require('path')
const config = require('config')
const rfs = require('rotating-file-stream')
const Koa = require('koa')
const session = require('koa-session')
const CSRF = require('koa-csrf')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const compress = require('koa-compress')
const views = require('koa-views')

const isProduction = /production/.test(process.env.NODE_ENV)
const app = new Koa()
const router = require('./router')
app.keys = config.get('keys')

require('log4js').configure(require('../config/log4js'))

const loggerOptions = {}
if (isProduction) {
  loggerOptions.stream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, '../log')
  })
}

app.use(require('./middleware/logger')(isProduction ? 'combined' : 'dev', loggerOptions))
app.use(compress())
app.use(require('./middleware/minify')())
// 放在csrf之前
app.use(bodyParser({
  formLimit: '10mb'
}))
app.use(session(app))
app.use(new CSRF())
app.use(json())
// 在json化之前
app.use(require('./middleware/onerror'))
app.use(require('kcors')({
  credentials: true,
  keepHeadersOnError: true,
  maxAge: '86400',
  allowHeaders: 'Accept,Content-Type,X-Requested-With,csrf-token',
  origin: (ctx) => {
    const requestOrigin = ctx.get('Origin')
    return requestOrigin
  }
}))
app.use(koaStatic(path.join(__dirname, 'public'), {
   maxage: isProduction ? 1000 * 3600 * 24 : 0
}))
app.use(require('./middleware/render'))
app.use(require('./middleware/state'))
app.use(router.routes())

app.listen(config.get('port'), function() {
  console.log(`server is running on port ${this.address().port}`)
})

module.exports = app
