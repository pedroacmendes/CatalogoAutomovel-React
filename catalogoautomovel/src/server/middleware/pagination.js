const { parse } = require('querystring')

const pagination = () => async (ctx, next) => {
	const params = ctx.searchParams || parse(ctx.search.slice(1))
	const pageSize = parseInt(params.page_size, 10) || 24
	const page = parseInt(params.page) || 0
	ctx.pagination = {
		limit: pageSize,
		skip: pageSize * page
	}
	await next()
}

module.exports = pagination