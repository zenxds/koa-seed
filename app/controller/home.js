'use strict'
const redisClient = require('../service/redis').factory()

exports.index = async(ctx, next) => {
  const key = await redisClient.incrAsync('key')

  await ctx.render('index', {
    title: '首页',
    key: key
  })
}
