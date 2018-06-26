const path = require('path')
const rfs = require('rotating-file-stream')
const morgan = require('./morgan')

const loggerFormat = ':real-ip [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'

module.exports = function(app) {
  if (app.isProduction) {
    return morgan(loggerFormat, {
      stream: rfs('access.log', {
        interval: '1d', // rotate daily
        path: path.join(__dirname, '../../../log')
      })
    })
  }

  return morgan('dev', {})
}
