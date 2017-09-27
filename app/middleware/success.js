/**
 * api success 封装
 */
const isJSON = require('koa-is-json')

module.exports = async function(ctx, next) {
  await next()

  if (isJSON(ctx.body) && ctx.status === 200 && !hasWrapped(ctx.body)) {
    ctx.body = {
      success: true,
      data: ctx.body
    }
  }
}

function hasWrapped(data) {
  return typeof data === 'object' && typeof data.success !== 'undefined'
}
