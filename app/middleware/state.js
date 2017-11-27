/**
 * ctx.state会被合并进模板引擎的locals
 * Object.assign(locals, options, ctx.state || {})
 */
module.exports = async function(ctx, next) {
  ctx.state = {
    request: ctx.request,
    isMobile: /iPhone|iPad|iPod|Android/i.test(ctx.get('user-agent'))
  }
  await next()
}
