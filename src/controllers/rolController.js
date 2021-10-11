const express = require("express");
const db = require("../database/models");

const rolController = {
    
    listado: function(req, res){
        db.Rol.findAll()
            .then(function (roles) {
                res.render("rol/lista", {roles: roles})
            })
    },

    create: function(req,res){
        res.render("rol/crear")
    },

    save: function(req,res){
        db.Rol.create({
            name: req.body.nombre,
            detail: req.body.detalle
        });
        res.redirect("/rol")
    },

    edit: function(req,res) {
        let rol = db.Rol.findByPk(req.params.id)       
        .then(function (rol) {
            res.render("rol/editar", {rol: rol})
        })        
    }, 

    update: function(req,res){
        db.Rol.update({
            name: req.body.nombre,
            detail: req.body.detalle
        },{
            where:{
                id: req.params.id
            }
        });
        res.redirect("/rol")
    },

    delete: function(req,res){
        db.Rol.destroy({            
            where:{
                id: req.params.id
            }
        }); 
        res.redirect("/rol")
    },
};

module.exports = rolController;