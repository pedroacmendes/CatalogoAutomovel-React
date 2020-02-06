const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

const session = async (ctx, next) => {
	try {
		const token = ctx.cookies.get('Authorization')
		const decoded = jwt.verify(token, JWT_SECRET)
		ctx.state.user = decoded
	} catch (_) {
		ctx.state.user = null
	}
	await next()
}

module.exports = session
