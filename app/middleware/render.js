const path = require('path')
const views = require('koa-views')
const moment = require('moment')
const nunjucks = require('nunjucks')

const viewPath = path.join(__dirname, '../view')

const env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(viewPath)
)

env.addFilter('moment', function(time, format) {
  return moment(time).format(format)
})

module.exports = views(viewPath, {
  map: {
    html: 'nunjucks'
  },
  extension: 'html',
  options: {
    nunjucksEnv: env
  }
})
