const client = require('./redis').getClient()

/**
 * 消息队列
 */

class MQ {

  constructor(key) {
    if (!key) {
      throw new Error('key must specify for MQ')
    }
    this.key = key
  }

  /**
   * push a task to queue
   * @memberof MQ
   */
  async create(task) {
    return client.lpushAsync(this.key, JSON.stringify(task))
  }

  /**
   *
   *
   *
   * @memberof MQ
   */
  async consume() {
    return client.rpopAsync(this.key).then((task) => {
      if (task) {
        return JSON.parse(task)
      }

      return Promise.reject()
    })
  }

}

module.exports = MQ
