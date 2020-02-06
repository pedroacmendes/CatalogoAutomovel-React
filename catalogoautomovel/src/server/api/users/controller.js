const User = require('./model')

class UsersController {

	/**
	 * Get all posts
	 * @param {ctx} Koa Context
	 */
	async find(ctx) {
		const { sort = '' } = ctx.searchParams
		const [sort_field, sort_order] = sort.split(',').map(s => s.length ? s : undefined)

		ctx.body = await User
			.find()
			.sort({
				[sort_field]: sort_order
			})
	}

	/**
	 * Find a post
	 * @param {ctx} Koa Context
	 */
	async findById(ctx) {
		try {
			const post = await User.findById(ctx.params.id)
			if (!post) {
				ctx.throw(404)
			}
			ctx.body = post
		} catch (err) {
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				ctx.throw(404)
			}
			ctx.throw(500)
		}
	}

	/**
	 * Add a post
	 * @param {ctx} Koa Context
	 */
	async add(ctx) {
		try {
			const post = await new User(ctx.request.body).save()
			ctx.set('Location', `/posts/${ post._id }`)
			ctx.status = 201
			ctx.body = post
		} catch (err) {
			if (err.name === 'MongoError') {
				ctx.throw(422, err.errmsg)
			}
			ctx.throw(422)
		}
	}

	/**
	 * Update a post
	 * @param {ctx} Koa Context
	 */
	async update(ctx) {
		try {
			const post = await User.findByIdAndUpdate(
				ctx.params.id,
				ctx.request.body,
				{ new: true }
			)
			if (!post) {
				ctx.throw(404)
			}
			// ctx.status = 204 - 204 is No Content
			ctx.body = post
		} catch (err) {
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				ctx.throw(404)
			}
			ctx.throw(500)
		}
	}

	/**
	 * Delete a post
	 * @param {ctx} Koa Context
	 */
	async delete(ctx) {
		try {
			const post = await User.findByIdAndRemove(ctx.params.id)
			if (!post) {
				ctx.throw(404)
			}
			ctx.body = post
		} catch (err) {
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				ctx.throw(404)
			}
			ctx.throw(500)
		}
	}
}

module.exports = new UsersController()
