const config = require('config')

const app = require('./app')

app.listen(config.get('port'), function() {
  console.log(`server is running on port ${this.address().port}`)
})

app.on('error', (err, ctx) => {
  app.errorLogger.error(`${ctx.path}: ${err.message}`)
})
