const { parse } = require('query-string')

const searchParams = () => async (ctx, next) => {
	const searchParams = parse(ctx.search.slice(1), {arrayFormat: 'comma'})
	ctx.searchParams = searchParams
	await next()
}

module.exports = searchParams