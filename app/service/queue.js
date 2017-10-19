const client = require('./redis').getClient()

/**
 * 消息队列
 */
class Queue {

  constructor(key) {
    if (!key) {
      throw new Error('key must specify for Queue')
    }
    this.key = key
  }

  /**
   * create a task to queue
   */
  async create(task) {
    return client.lpushAsync(this.key, JSON.stringify(task))
  }

  /**
   * consume a task
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

module.exports = Queue
