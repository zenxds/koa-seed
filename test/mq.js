const expect = require('chai').expect
const MQ = require('../app/service/mq')
const mq = new MQ('mq')

describe('test/mq.js', () => {

  it('should push a task', done => {
    mq.push({
      name: 'name',
      value: 'value'
    }).then((length) => {
      expect(length).to.above(0)
      done()
    }).catch((err) => {
      done(err)
    })
  })


  it('should consume a task', done => {
    mq.consume().then((task) => {
      expect(task).to.be.an('object')
      done()
    }).catch((err) => {
      done()
    })
  })
})
