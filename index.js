const path = require('path')
const Koa = require('koa')
const config = require('config')
const session = require('koa-session')
const CSRF = require('koa-csrf')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const onerror = require('koa-onerror')
const views = require('koa-views')
const log4js = require('koa-log4')

const app = new Koa()
app.keys = config.get('keys')

log4js.configure(require('./config/log4js'))
if (process.env.NODE_ENV == 'prod') {
  app.use(log4js.koaLogger(log4js.getLogger('access')))
} else {
  app.use(log4js.koaLogger(log4js.getLogger()))
}

onerror(app)
// 放在csrf之前
app.use(bodyParser())
app.use(session(app))
app.use(new CSRF())
app.use(json())
app.use(koaStatic(path.join(__dirname, 'app/public')))
app.use(views(path.join(__dirname, 'app/view'), {
  map: {
    html: 'nunjucks'
  },
  extension: 'html',
  options: {
    settings: {
      views: path.join(__dirname, 'app/view')
    }
  }
}))
app.use(require('./app/router'))

app.listen(config.get('port'), function() {
  console.log(`server is running on port ${this.address().port}`)
})

module.exports = app
