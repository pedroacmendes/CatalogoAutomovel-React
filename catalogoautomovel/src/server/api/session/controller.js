const User = require('../users/model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

class SessionController {
	async login(ctx) {
		const user = await User
			.findOne({
				username: ctx.request.body.username
			})
		if (user) {
			const match = await bcrypt.compare(ctx.request.body.password, user.password)
			if (match) {
				const token = jwt.sign({
					username: user.username
				}, JWT_SECRET)
				ctx.cookies.set('Authorization', token, { httpOnly: false })
				ctx.body = user
			} else {
				ctx.throw(401)
			}
		} else {
			ctx.throw(401)
		}
	}

	logout(ctx) {
		ctx.cookies.set('Authorization', null)
		ctx.body = { success: true }
	}
}

module.exports = new SessionController()