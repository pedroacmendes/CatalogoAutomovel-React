const Router = require('koa-router')
const fs = require('fs')
const path = require('path')

const users = require('./users')
const session = require('./session')

const articles = require('./articles')

const api = new Router({
	prefix: '/api'
})
api.get('/', (ctx) => { ctx.body = { status: 'ok' } })

api.use(users.allowedMethods())
api.use(users.routes())
api.use(session.allowedMethods())
api.use(session.routes())

api.use(articles.allowedMethods())
api.use(articles.routes())

api.post('/upload', (ctx) => {
	if (ctx.request.files.file) {
		const file = ctx.request.files.file
		const storagePath = path.resolve('storage')
		const filePath = path.resolve('storage', file.name)
		if (!fs.existsSync(storagePath)){
			fs.mkdirSync(storagePath);
		}
		fs.renameSync(file.path, filePath)
		ctx.body = { ok: true, url: `/storage/${ file.name }` }
	}
})

module.exports = api