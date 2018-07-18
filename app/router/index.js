const { Router } = require('the-rang')
const router = new Router()

const home = require('../controller/home')

router.get('/', home.index)

module.exports = router
