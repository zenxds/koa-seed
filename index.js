const path = require('path')
const Koa = require('koa')
const config = require('config')
const convert = require('koa-convert')
const session = require('koa-session')
const CSRF = require('koa-csrf').default
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const views = require('koa-views')
const cors = require('kcors')

const app = new Koa()
app.keys = config.get('keys')

if (process.env.NODE_ENV == 'dev') {
  app.use(logger())
}
onerror(app)
// 放在csrf之前
app.use(bodyParser())
app.use(session(app))
app.use(new CSRF())
app.use(convert(cors()))
app.use(json())
app.use(koaStatic(path.join(__dirname, 'app/public')))
app.use(views(path.join(__dirname, 'app/views'), {
  map: {
    html: 'nunjucks'
  },
  extension: 'html',
  options: {
    settings: {
      views: path.join(__dirname, 'app/views')
    }
  }
}))
app.use(require('./app/router'))

app.listen(config.get('port'), function() {
  console.log(`server is running on port ${this.address().port}`)
})
