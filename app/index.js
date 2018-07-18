const path = require('path')
const config = require('config')
const { Application, middlewares } = require('the-rang')

const app = new Application({
  keys: config.get('keys')
})
const router = require('./router')

app.use(middlewares.logger(app))
app.use(middlewares.compress())
app.use(middlewares.minify())
// 放在csrf之前
app.use(middlewares.bodyParser())
app.use(middlewares.session(app))
app.use(middlewares.csrf())
app.use(middlewares.cors())
app.use(middlewares.json())
app.use(middlewares.static(path.join(app.root, 'app/public'), {
  maxage: app.isProduction ? 1000 * 3600 * 24 : 0
}))
// 返回的时候在json化之前
app.use(middlewares.onerror())
app.use(middlewares.render(app))
app.use(require('./middleware/state'))
app.use(router.routes())

app.listen(config.get('port'), function() {
  console.log(`server is running on port ${this.address().port}`)
})

app.on('error', (err, ctx) => {
  app.errorLogger.error(`${ctx.path}: ${err.message}`)
})

module.exports = app
