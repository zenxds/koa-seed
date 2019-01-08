const config = require('config')
const redis = require('redis-promisify')

const redisConfig = config.get('redis')
const client = redis.createClient(redisConfig)

module.exports = {
  factory: (cfg = {}) => {
    return redis.createClient(Object.assign({}, redisConfig, cfg))
  },

  getClient: () => {
    return client
  }
}
