const config = require('config')
const redis = require("redis-promisify")

module.exports = {
  factory: () => {
    return redis.createClient(config.get('redis'))
  }
}