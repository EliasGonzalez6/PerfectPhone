const bcryptjs = require('bcryptjs');
const {
	validationResult
} = require('express-validator');

const User = require('../models/User');

const controller = {
	register: (req, res) => {
		return res.render('formularioRegistro');
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('formularioRegistro', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
		
		let userInDB = User.findByField('email', req.body.email);

		
		if (userInDB) {
			return res.render('formularioRegistro', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/user/login');
	},
	login: (req, res) => {
		return res.render('formularioUsuario');
	},
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/profile');
			} 
			return res.render('formularioUsuario', {
				errors: {
					email: {
						msg: 'Los datos son inválidos'
					}
				}
			});
		}

		return res.render('formularioUsuario', {
			errors: {
				email: {
					msg: 'Email invalido'
				}
			}
		});
	},
	profile: (req, res) => {
		return res.render('perfilUsuario', {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	carrito: (req, res) => {
		return res.render('carrito');
	},
}

module.exports = controller;