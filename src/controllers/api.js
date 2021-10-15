const express = require("express");
const db = require("../database/models");


module.exports = {
    
    users: async function(req, res){
        try {
        const users = await db.User.findAll()
            return res.status(200).json({
                length: users.length,
                return: users
            
            });
         } 
         catch(error){
            return res.status(500), ({user: user}) 
         }
        
    },

    userId: function(req,res) {
        let user = db.User.findByPk(req.params.id,{
            include:[{association:"roles"}]
        })       
        .then(function (user) {
            res.render("user/detalle", {user: user})
        })        
    }, 

    products: function(req,res){
        db.Brand.create({
            name: req.body.nombre,
            detail: req.body.detalle
        });
        res.redirect("/brand")
    },

    productId: function(req,res) {
        let brand = db.Brand.findByPk(req.params.id)       
        .then(function (brand) {
            res.render("brand/editar", {brand: brand})
        })        
    }
};