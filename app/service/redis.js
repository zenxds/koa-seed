const config = require('config')
const redis = require("redis-promisify")
const client = redis.createClient(config.get('redis'))

module.exports = client