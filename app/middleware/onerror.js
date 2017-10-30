const isJSON = require('koa-is-json')
const log4js = require('log4js')
const logger = log4js.getLogger('error')

/**
 * onerror handler
 */
module.exports = async function(ctx, next) {
  const isAPI = /\/api\//.test(ctx.path)

  try {
    await next()

    if (isAPI && validateStatus(ctx.status)) {
      ctx.body = {
        success: true,
        data: ctx.body
      }
    }
  } catch (err) {
    if (isAPI) {
      ctx.body = {
        success: false,
        message: err.message
      }
    } else {
      ctx.status = err.status || 500
      await ctx.render('500', {
        err: err
      })
    }

    logger.error(err.message)
    ctx.app.emit('error', err, ctx)
  }

  if (ctx.status === 404) {
    await ctx.render('404')
  }
}

/**
 * from https://github.com/axios/axios
 */
function validateStatus(status) {
  return status >= 200 && status < 300
}
