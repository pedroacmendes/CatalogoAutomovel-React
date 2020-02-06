const Router = require('koa-router')

const Controller = require('./controller')

const router = new Router()

// POST /api/login
router.post('/login', Controller.login)
// POST /api/logout
router.post('/logout', Controller.logout)

module.exports = router