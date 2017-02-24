const path = require('path')
const co = require('co')
const Koa = require('koa')
const config = require('config')
const convert = require('koa-convert')
const session = require('koa-session')
const CSRF = require('koa-csrf').default
const render = require('koa-swig')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const logger = require('koa-logger')
const onerror = require('koa-onerror')

const app = new Koa()
app.context.render = co.wrap(render({
    root: path.join(__dirname, 'app/views'),
    autoescape: true,
    ext: 'html'
}))
app.keys = config.get('keys')

if (process.env.NODE_ENV == 'dev') {
  app.use(convert(logger()))
}
onerror(app)
// 放在csrf之前
app.use(bodyParser())
app.use(convert(session(app)))
app.use(new CSRF())
app.use(convert(json()))
app.use(convert(koaStatic(path.join(__dirname, 'app/public'))))
app.use(convert(koaStatic(path.join(__dirname, 'node_modules'))))
app.use(require('./app/router'))

app.on('error', function (err) {
  console.log(err)
})

app.listen(config.get('port'), function() {
  console.log(`server is running on port ${this.address().port}`)
})
