const express = require("express");
const db = require("../database/models");

const categoryController = {
    
    listado: function(req, res){
        db.Category.findAll()
            .then(function (categories) {
                res.render("category/lista", {categories: categories})
            })
    },

    create: function(req,res){
        res.render("category/crear")
    },

    save: function(req,res){
        db.Category.create({
            name: req.body.nombre,
            detail: req.body.detalle
        });
        res.redirect("/category")
    },

    edit: function(req,res) {
        let category = db.Category.findByPk(req.params.id)       
        .then(function (category) {
            res.render("category/editar", {category: category})
        })        
    }, 

    update: function(req,res){
        db.Category.update({
            name: req.body.nombre,
            detail: req.body.detalle
        },{
            where:{
                id: req.params.id
            }
        });
        res.redirect("/category")
    },

    delete: function(req,res){
        db.Category.destroy({            
            where:{
                id: req.params.id
            }
        }); 
        res.redirect("/category")
    },
};

module.exports = categoryController;