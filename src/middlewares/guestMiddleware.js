function guestMiddleware(req, res, next) {
	if (req.session.perfilUsuario) {
		return res.redirect('/user/profile');
	}
	next();
}

module.exports = guestMiddleware;