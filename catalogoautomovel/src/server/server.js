require('dotenv').config()

const Koa = require('koa')
const mongoose = require('mongoose')
const koaBody = require('koa-body')

const searchParams = require('./middleware/searchParams')
const pagination = require('./middleware/pagination')
const session = require('./middleware/session')
const api = require('./api')

const {
	API_PORT = 4000,
	MONGO_DB_HOST,
	MONGO_BD_PORT,
	MONGO_DB_NAME
} = process.env

mongoose.connect(
	`mongodb://${ MONGO_DB_HOST }:${ MONGO_BD_PORT }/${ MONGO_DB_NAME }`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	}
)
mongoose.connection.on('error', console.error);

const app = new Koa()

app
	.use(searchParams())
	.use(pagination())
	.use(session)
	.use(koaBody({ multipart: true }))
	.use(api.allowedMethods())
	.use(api.routes())


// SERVING STATIC ASSETS AND INDEX.HTML
// Since it is a single page app you need to always serve index.html
// and let the react router work with the path

const serve = require('koa-static')
const send = require('koa-send')
const mount = require('koa-mount')
const path = require('path')

const storagePath = path.resolve('storage')
const buildPath = path.resolve('build')

app.use(mount("/storage", serve(storagePath)))
app.use(mount("/build", serve(buildPath)))

app.use(async ctx => {
	if (ctx.path.startsWith('/') && !ctx.path.match(/^\/(api|storage)/)) {
		await send(ctx, 'index.html', { root: buildPath })
	}
})

app
	.listen(API_PORT, () => {
		console.log('Server started on port', API_PORT)
	})
