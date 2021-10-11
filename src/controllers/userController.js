const express = require("express");
const db = require("../database/models");
const bcryptjs = require('bcryptjs');

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

    delete: function(req,res){
        db.User.destroy({            
            where:{
                id: req.params.id
            }
        }); 
        res.redirect("/user")
    },
};

module.exports = userController;