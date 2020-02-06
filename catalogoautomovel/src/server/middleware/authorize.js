const authorize = (authorizedScopes = []) => async (ctx, next) => {
	if (!ctx.state.user) {
		ctx.throw(401)
		return
	}
	const userScopes = ctx.state.user.scopes || []
	const userIncludesAScope = userScopes.some(
		(userScope) => (authorizedScopes || []).includes(userScope)
	)
	if (!userIncludesAScope) {
		ctx.throw(403)
		return
	}
	await next()
}

module.exports = authorize
