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

    create: (req,res) => res.render("category/crear"),

    update: (req,res) => res.render("category/editar"),

    delete: (req,res) => res.render("category/editar"),
    
};

module.exports = categoryController;