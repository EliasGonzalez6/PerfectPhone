const express = require("express");
const db = require("../database/models");

const colorController = {
    
    listado: function(req, res){
        db.Color.findAll()
            .then(function (color) {
                res.render("color/lista", {color: color})
            })
    },

    create: function(req,res){
        res.render("color/crear")
    },

    save: function(req,res){
        db.Color.create({
            name: req.body.nombre,
            codigo: req.body.codigo
        });
        res.redirect("/color")
    },

    edit: function(req,res) {
        let color = db.Color.findByPk(req.params.id)       
        .then(function (color) {
            res.render("color/editar", {color: color})
        })        
    }, 

    update: function(req,res){
        db.Color.update({
            name: req.body.nombre,
            codigo: req.body.codigo
        },{
            where:{
                id: req.params.id
            }
        });
        res.redirect("/color")
    },

    delete: function(req,res){
        db.Color.destroy({            
            where:{
                id: req.params.id
            }
        }); 
        res.redirect("/color")
    },
};

module.exports = colorController;