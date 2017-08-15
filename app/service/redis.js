const config = require('config')
const redis = require("redis-promisify")
const client = redis.createClient(config.get('redis'))


module.exports = {
  factory: () => {
    return redis.createClient(config.get('redis'))
  },

  getClient: () => {
    return client
  }
}
