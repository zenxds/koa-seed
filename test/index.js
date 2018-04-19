const expect = require('chai').expect
const request = require('supertest')
const app = require('../app')

describe('test/index.js', () => {

  it('should test index', done => {
    request(app.callback())
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.a('null')
        done()
      })
  })

})
