const expect = require('chai').expect
const Quque = require('../app/service/queue')
const q = new Quque('testQueue')

describe('test/mq.js', () => {

  it('should create a task', done => {
    q.create({
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
    q.consume().then((task) => {
      expect(task).to.be.an('object')
      done()
    }).catch((err) => {
      done()
    })
  })
})
