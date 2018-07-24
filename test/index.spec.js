const request = require('supertest')

const app = require('../app')
const router = require('../app/router')(app)
const middlewares = app.middlewares
app.use(middlewares.render(app))
app.use(middlewares.state)
app.use(router.routes())

describe('test/index.js', () => {

  test('should test index', done => {
    request(app.callback())
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull()
        done()
      })
  })

})
