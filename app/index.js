const path = require('path')
const config = require('config')
const session = require('koa-session')
const CSRF = require('koa-csrf')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const compress = require('koa-compress')

const app = require('./app')
const router = require('./router')

app.use(require('./middleware/logger')(app))
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
app.use(require('./middleware/cors'))
app.use(koaStatic(path.join(__dirname, 'public'), {
   maxage: app.isProduction ? 1000 * 3600 * 24 : 0
}))
app.use(require('./middleware/render'))
app.use(require('./middleware/state'))
app.use(router.routes())

app.listen(config.get('port'), function() {
  console.log(`server is running on port ${this.address().port}`)
})

module.exports = app
