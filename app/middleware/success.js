/**
 * api success 封装
 */
const isJSON = require('koa-is-json')

module.exports = async function(ctx, next) {
  await next()

  if (isJSON(ctx.body)) {
    ctx.body = {
      success: true,
      data: ctx.body
    }
  }
}
