const Router = require('koa-router')

const Controller = require('./controller')

// const authorize = require('../../middleware/authorize')

const router = new Router({
	prefix: '/articles'
})

// GET /api/posts
router.get('/', Controller.find)

// POST /api/posts
router.post('/', Controller.add)

// GET /api/posts/id
router.get('/:id', Controller.findById)

// PUT /api/posts/id
router.put('/:id', Controller.update)

// DELETE /api/posts/id
router.delete('/:id', Controller.delete)

module.exports = router