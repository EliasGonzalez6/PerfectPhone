const express = require("express");
const db = require("../database/models");
const Op = require("../../node_modules/sequelize/lib/operators");

const productController = {
    
    listado: function(req, res){
        db.Product.findAll()
            .then(function (product) {
                res.render("product/lista", {product: product})
            })
    },

    detail: function(req,res) {
        let product = db.Product.findByPk(req.params.id,{
            include:[{association:"brands"},{association:"categories"},{association:"colors"}]
        })       
        .then(function (product) {
            res.render("product/detalles", {product: product})
        })        
    },   
    
    buscar: async function(req,res) {
        console.log("Entre aqui");
        let product = await db.Product.findAll({
            where:{
                name:{[Op.like]:`%${req.params.busqueda}%`},
            }
        })       
        .then(function (product) {
            res.render("product/lista", {product: product})
        })       
    },  

    /*******************/

    create: function(req,res){
        res.render("product/crear")
    },

    save: function(req,res){
        db.Product.create({
            name: req.body.nombre,
            detail: req.body.detalle
        });
        res.redirect("/product")
    },

    edit: function(req,res) {
        let product = db.Product.findByPk(req.params.id)       
        .then(function (product) {
            res.render("product/editar", {product: product})
        })        
    }, 

    update: function(req,res){
        db.Product.update({
            name: req.body.nombre,
            detail: req.body.detalle
        },{
            where:{
                id: req.params.id
            }
        });
        res.redirect("/product")
    },

    delete: function(req,res){
        db.Product.destroy({            
            where:{
                id: req.params.id
            }
        }); 
        res.redirect("/product")
    },
};

module.exports = productController;