const express = require("express");
const db = require("../database/models");

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
        res.render("user/crear")
    },

    save: function(req,res){
        db.User.create({
            name: req.body.nombre,
            detail: req.body.detalle
        });
        res.redirect("/user")
    },

    edit: function(req,res) {
        let user = db.User.findByPk(req.params.id)       
        .then(function (user) {
            res.render("user/editar", {user: user})
        })        
    }, 

    update: function(req,res){
        db.User.update({
            name: req.body.nombre,
            detail: req.body.detalle
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