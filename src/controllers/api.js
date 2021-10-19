const express = require("express");
const db = require("../database/models");


module.exports = {
    
    GetUsers: async function(req, res){
        try {
        const users = await db.User.findAll({include:["roles"], attributes:["id","fullname","email","avatar"]})
            return res.status(200).json({
                count: users.length,
                return: users
            
            });
        } 
        catch(error){
            return res.status(500), ({error: error}) 
        }        
    },

    
    GetUserId: async function(req, res){
        try {
        const user = await db.User.findByPk(req.params.id,{include:["roles"], attributes:["id","fullname","email","avatar"]})
            return res.status(200).json({
                count: user.length,
                return: user            
            });
        } 
        catch(error){
            return res.status(500), ({error: error}) 
        }        
    }, 
        
    GetProducts: async function(req, res){
        try {
        const products = await db.Product.findAll({include:["brands", "categories", "colors"]})
            return res.status(200).json({
                count: products.length,
                return: products
            
            });
        } 
        catch(error){
            return res.status(500), ({error: error}) 
        }        
    },

    GetProductId: async function(req, res){
        try {
        const product = await db.Product.findByPk(req.params.id,{include:["brands", "categories", "colors"]})
            return res.status(200).json({
                count: product.length,
                return: product
            
            });
        } 
        catch(error){
            return res.status(500), ({error: error}) 
        }
    }
}