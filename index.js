const path = require('path')
const app = require('koa')()
const session = require('koa-session')
const csrf = require('koa-csrf')
const render = require('koa-swig')
const koaStatic = require('koa-static')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const logger = require('koa-logger')
const config = require('config')

// swig render
app.context.render = render({
    root: path.join(__dirname, 'app/views'),
    autoescape: true,
    ext: 'html'
})
app.keys = config.get('keys')

app.use(logger())
// 放在csrf之前
app.use(bodyparser())
app.use(session(app))
app.use(csrf())
app.use(json())
app.use(koaStatic(path.join(__dirname, 'app/public')))
app.use(koaStatic(path.join(__dirname, 'node_modules')))
app.use(require('./app/router'))

app.on('error', function (err) {
    console.log(err)
})

app.listen(config.get('port'), function() {
    console.log(`server is running on port ${this.address().port}`)
})