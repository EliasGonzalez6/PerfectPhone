const express = require("express");
const router = express.Router();
const path = require("path");
const category = require('../models/category');
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

    update: (req,res) => res.render("category/editar"),

    delete: (req,res) => res.render("category/editar"),
    
};

module.exports = categoryController;