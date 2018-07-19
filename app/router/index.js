const { Router } = require('the-rang')

module.exports = app => {
  const router = new Router()

  router.get('/', app.controllers.home.index)

  return router
}
