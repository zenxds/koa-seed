const config = require('config')
const app = require('./app')
const router = require('./app/router')(app)
const { middlewares, services, errorLogger, isProduction } = app
const { RedisStore } = middlewares.session

app.use(middlewares.logger(app))
app.use(middlewares.compress())
app.use(middlewares.minify())
// 放在csrf之前
app.use(middlewares.bodyParser())
app.use(middlewares.session({
  store: new RedisStore({
    client: services.redis.factory({ db: 1 })
  })
}, app))
app.use(middlewares.csrf())
app.use(middlewares.cors())
app.use(middlewares.json())
app.use(middlewares.static(app.resolve('app/public'), {
  maxage: isProduction ? 1000 * 3600 : 0
}))
// 返回的时候在json化之前
app.use(middlewares.onerror())
app.use(middlewares.render(app))
app.use(middlewares.state)
app.use(router.routes())

app.listen(config.get('port'), function() {
  console.log(`server is running on port ${this.address().port}`)
})

app.on('error', (err, ctx) => {
  errorLogger.error(`${ctx.path}: ${err.message}`)
})
