const express = require("express");
const db = require("../database/models");
const Op = require("../../node_modules/sequelize/lib/operators");

const {
	validationResult
} = require('express-validator');

const productController = {
    
    listado: function(req, res){
        db.Product.findAll()
            .then(function (product) {
                res.render("product/lista", {product: product})
            })
    },

    productlista: function(req, res){
        db.Product.findAll()
            .then(function (product) {
                res.render("product/productlista", {product: product})
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
        let brand = db.Brand.findAll();
        let color = db.Color.findAll();
        let category = db.Category.findAll(); 

        Promise.all([brand,color,category])
        .then(function ([brand,color,category]) {
            res.render("product/crear", {brand: brand, color:color, category:category})
        })         
    },

    save: function(req,res){
        const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render("product/crear", {
				brand:db.Brand.findAll(),
                color:db.Color.findAll(),
                category:db.Category.findAll(),
                errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
        else {
            db.Product.create({
                name: req.body.name,
                description: req.body.description, 
                image: req.file.filename,                                
                price: req.body.price,
                stock: req.body.stock,
                color: req.body.color,
                brand: req.body.brand,
                category: req.body.category
            });
            res.redirect("productlista")
        }        
    },

    edit: function(req,res) {
        let product = db.Product.findByPk(req.params.id)
        let brand = db.Brand.findAll();
        let color = db.Color.findAll();
        let category = db.Category.findAll(); 

        Promise.all([product,brand,color,category])
        .then(function ([brand,color,category]) {
            res.render("product/editar", {product:product, brand: brand, color:color, category:category})
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
        res.redirect("productlista")
    },

    delete: function(req,res){
        db.Product.destroy({            
            where:{
                id: req.params.id
            }
        }); 
        res.redirect("/product/productlista")
    },
};

module.exports = productController;