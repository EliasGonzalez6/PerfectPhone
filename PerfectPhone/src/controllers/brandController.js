const express = require("express");
const db = require("../database/models");

const brandController = {
    
    listado: function(req, res){
        db.Brand.findAll()
            .then(function (brand) {
                res.render("brand/lista", {brand: brand})
            })
    },

    create: function(req,res){
        res.render("brand/crear")
    },

    save: function(req,res){
        db.Brand.create({
            name: req.body.nombre,
            detail: req.body.detalle
        });
        res.redirect("/brand")
    },

    edit: function(req,res) {
        let brand = db.Brand.findByPk(req.params.id)       
        .then(function (brand) {
            res.render("brand/editar", {brand: brand})
        })        
    }, 

    update: function(req,res){
        db.Brand.update({
            name: req.body.nombre,
            detail: req.body.detalle
        },{
            where:{
                id: req.params.id
            }
        });
        res.redirect("/brand")
    },

    delete: function(req,res){
        db.Brand.destroy({            
            where:{
                id: req.params.id
            }
        }); 
        res.redirect("/brand")
    },
};

module.exports = brandController;