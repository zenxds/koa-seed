const path = require('path')
const Koa = require('koa')
const config = require('config')
const session = require('koa-session')
const CSRF = require('koa-csrf')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const compress = require('koa-compress')
const onerror = require('koa-onerror')
const views = require('koa-views')
const log4js = require('koa-log4')

const isProdEnv = /production/.test(process.env.NODE_ENV)
const app = new Koa()
const router = require('./app/router')
app.keys = config.get('keys')

log4js.configure(require('./config/log4js'))
app.use(log4js.koaLogger(isProdEnv ? log4js.getLogger('access') : log4js.getLogger()))

onerror(app)
app.use(compress())
app.use(require('./app/middleware/minify')())
// 放在csrf之前
app.use(bodyParser({
  formLimit: '10mb'
}))
app.use(session(app))
app.use(new CSRF())
app.use(json())
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
app.use(koaStatic(path.join(__dirname, 'app/public'), {
   maxage: isProdEnv ? 1000 * 3600 * 24 : 0
}))
app.use(require('./app/middleware/render'))
app.use(require('./app/middleware/state'))
app.use(router.routes())

app.listen(config.get('port'), function() {
  console.log(`server is running on port ${this.address().port}`)
})

module.exports = app
