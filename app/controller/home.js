'use strict'

exports.index = async(ctx, next) => {
  const redisClient = ctx.services.redis.getClient()
  const key = await redisClient.incrAsync('key')

  await ctx.render('index', {
    title: '首页',
    key: key
  })
}
