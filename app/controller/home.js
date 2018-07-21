'use strict'
const { Controller } = require('the-rang')

class HomeController extends Controller {
  async index() {
    const redisClient = this.services.redis.getClient()
    const key = await redisClient.incrAsync('key')

    await this.render('index', {
      title: '首页',
      key: key
    })
  }
}

module.exports = HomeController
