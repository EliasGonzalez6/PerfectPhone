const express = require("express");
const db = require("../database/models");
const bcryptjs = require('bcryptjs');

const {
	validationResult
} = require('express-validator');

const userController = {
    
    listado: function(req, res){
        db.User.findAll()
            .then(function (user) {
                res.render("user/lista", {user: user})
            })
    },

    detail: function(req,res) {
        let user = db.User.findByPk(req.params.id,{
            include:[{association:"roles"}]
        })       
        .then(function (user) {
            res.render("user/detalle", {user: user})
        })        
    }, 

    create: function(req,res){
        let roles = db.Rol.findAll()       
        .then(function (roles) {
            res.render("user/crear", {roles: roles})
        })         
    },

    save: function(req,res){
        db.User.create({
            fullname: req.body.fullname,
            email: req.body.email,            
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.body.avatar,
            rol: req.body.rol
        });
        res.redirect("/user")
    },

    edit: function(req,res) {
        let user = db.User.findByPk(req.params.id);
        let roles = db.Rol.findAll();
        
        Promise.all([user,roles])
        .then(function ([user,roles]) {
            res.render("user/editar", {user: user, roles:roles})
        })        
    }, 

    editprofile: function(req,res) {
        let user = db.User.findByPk(req.params.id);
        let roles = db.Rol.findAll();
        
        Promise.all([user,roles])
        .then(function ([user,roles]) {
            res.render("user/editprofile", {user: user, roles:roles})
        })        
    },

    update: function(req,res){
        db.User.update({
            fullname: req.body.fullname,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.body.avatar,
            rol: req.body.rol
        },{
            where:{
                id: req.params.id
            }
        });
        res.redirect("/user")
    },

    updateprofile: function(req,res){
        db.User.update({
            fullname: req.body.fullname,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.body.avatar,
            rol: req.body.rol
        },{
            where:{
                id: req.params.id
            }
        });
        res.redirect("/user/profile")
    },

    delete: function(req,res){
        db.User.destroy({            
            where:{
                id: req.params.id
            }
        }); 
        res.redirect("/user")
    },

    login: function (req, res) {
		return res.render('user/formularioUsuario');
	},

	loginProcess: async function (req, res) {
        let userToLogin = await db.User.findOne({
            where:{
                email:req.body.email
            }
        })
				
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
			return res.render('user/formularioUsuario', {
				errors: {
					email: {
						msg: 'Los datos son inválidos'
					}
				}
			});
		}

		return res.render('user/formularioUsuario', {
			errors: {
				email: {
					msg: 'Email invalido'
				}
			}
		});
	},

    register: function (req, res) {
		return res.render('user/formularioRegistro');
	},

	processRegister: async function (req, res) {
		const resultValidation = validationResult(req);
        
		if (resultValidation.errors.length > 0) {
			return res.render('user/formularioRegistro', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
		
		let userInDB = await db.User.findOne({
            where:{
                email:req.body.email
            }
        })
        		
		if (userInDB) {
			return res.render('user/formularioRegistro', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}
		
		let userCreated = db.User.create({
            fullname: req.body.fullname,
            email: req.body.email,            
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename,
            rol: req.body.rol
        });

		return res.redirect('/user/login');
	},	

    profile: function (req, res) {
		return res.render('user/perfilUsuario', {
			user: req.session.userLogged
		});
	},
	
	logout: function (req, res) {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},

	carrito: function (req, res) {
		return res.render('user/carrito');
	},
};

module.exports = userController;