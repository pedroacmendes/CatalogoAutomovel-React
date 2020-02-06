const Article = require('./model')
// const { each, queue } = require('async')

class ArticlesController {

	async search(ctx) {
		const { q = '' } = ctx.searchParams || {}
		const result = await Article
			.fuzzySearch(q)
			.limit(5)
		ctx.body = result
	}

	/**
	 * Get all articles
	 * @param {ctx} Koa Context
	 */
	async find(ctx) {
		const { sort = '', q, read_time, tags } = ctx.searchParams || {}
		const { limit, skip } = ctx.pagination || {}
		const [sort_field, sort_order] = sort.split(',').map(s => s.length ? s : undefined)
		
		const filter = {}
		if (read_time) {
			filter['props.readTime'] = Array.isArray(read_time) ?
				{
					$gte: parseInt(read_time[0], 10) || 0,
					$lte: parseInt(read_time[1], 10) || undefined
				} :
				{ $gte: parseInt(read_time, 10) || 0 }
		}
		if (tags) {
			const tagsArray = Array.isArray(tags) ? tags : [tags]
			filter['tags'] = { "$in" : tagsArray}
		}
		
		let articleQuery = Article
		if (q && q.length) {
			articleQuery = articleQuery
				.fuzzySearch(q)
		}
		articleQuery = articleQuery
			.find(filter)
			.sort({
				created: 'desc',
				[sort_field]: sort_order
			})
			.limit(limit)
			.skip(skip)

		const [total, result] = await Promise.all([
			Article.countDocuments(),
			articleQuery
		])
		ctx.body = {
			list: result,
			pagination: {
				pageSize: limit,
				page: Math.floor(skip / limit),
				hasMore: (skip + limit) < total,
				total: total
			}
		}
	}

	/**
	 * Find a article
	 * @param {ctx} Koa Context
	 */
	async findById(ctx) {
		try {
			const article = await Article
				.findById(ctx.params.id)
				.populate('author')
				// .populate('comments')
			if (!article) {
				ctx.throw(404)
			}
			ctx.body = article
		} catch (err) {
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				ctx.throw(404)
			}
			ctx.throw(500)
		}
	}

	/**
	 * Add a article
	 * @param {ctx} Koa Context
	 */
	async add(ctx) {
		try {
			const article = await new Article(ctx.request.body).save()
			ctx.set('Location', `/articles/${ article._id }`)
			ctx.status = 201
			ctx.body = article
		} catch (err) {
			ctx.throw(422)
		}
	}

	/**
	 * Update a article
	 * @param {ctx} Koa Context
	 */
	async update(ctx) {
		try {
			const article = await Article.findByIdAndUpdate(
				ctx.params.id,
				ctx.request.body,
				{
					new: true,
					useFindAndModify: false
				}
			)
			if (!article) {
				ctx.throw(404)
			}
			// ctx.status = 204 - 204 is No Content
			ctx.body = article
		} catch (err) {
			console.log('err', err)
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				ctx.throw(404)
			}
			ctx.throw(500)
		}
	}

	/**
	 * Delete a article
	 * @param {ctx} Koa Context
	 */
	async delete(ctx) {
		try {
			const article = await Article.findByIdAndRemove(ctx.params.id)
			if (!article) {
				ctx.throw(404)
			}
			ctx.body = article
		} catch (err) {
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				ctx.throw(404)
			}
			ctx.throw(500)
		}
	}
}

// const updateFuzzy = async (Model, attrs) => {
// 	const docs = await Model.find();
  
// 	const updateToDatabase = async (data, callback) => {
// 	   try {
// 		  if(attrs && attrs.length) {
// 			 const obj = attrs.reduce((acc, attr) => ({ ...acc, [attr]: data[attr] }), {});
// 			 return Model.findByIdAndUpdate(data._id, obj).exec();
// 		  }
  
// 		  return Model.findByIdAndUpdate(data._id, data).exec();
// 	   } catch (e) {
// 		  console.log(e);
// 	   } finally {
// 		  callback();
// 	   }
// 	};
  
// 	const myQueue = queue(updateToDatabase, 10);
// 	each(docs, (data) => myQueue.push(data.toObject()));
  
// 	myQueue.empty = function () {};
// 	myQueue.drain = function () {};
//  }
//  updateFuzzy(Article, ['title'])
module.exports = new ArticlesController()
