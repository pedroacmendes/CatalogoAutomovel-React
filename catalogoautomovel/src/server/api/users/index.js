const Router = require('koa-router')

const Controller = require('./controller')

const router = new Router({
	prefix: '/users'
})

// GET /api/users
router.get('/', Controller.find)

// POST /api/users
router.post('/', Controller.add)

// GET /api/users/id
router.get('/:id', Controller.findById)

// PUT /api/users/id
router.put('/:id', Controller.update)

// DELETE /api/users/id
router.delete('/:id', Controller.delete)

module.exports = router