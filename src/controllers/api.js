const express = require("express");
const db = require("../database/models");


module.exports = {
    
    GetUsers: async function(req, res){
        try {            
        const users = await db.User.findAll({attributes:["id","fullname","email","avatar"]})
            return res.status(200).json({
                count: users.length,                
                users: users                
            });
        } 
        catch(error){
            return res.status(500), ({error: error}) 
        }        
    },

    
    GetUserId: async function(req, res){
        try {
            const user = await db.User.findByPk(req.params.id,{attributes:["id","fullname","email","avatar"]})
            user.avatar = "/images/avatars/"+user.avatar;
            
            let data = res.status(200).json({
                count: user.length,
                user: user,                         
            });
            return data;
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
                products: products                
            });
        } 
        catch(error){
            return res.status(500), ({error: error}) 
        }        
    },

    GetProductId: async function(req, res){
        try {
        const product = await db.Product.findByPk(req.params.id,{include:["brands", "categories", "colors"]})
        product.image = "/uploads/products/"+product.image;

            return res.status(200).json({
                count: product.length,
                product: product
            
            });
        } 
        catch(error){
            return res.status(500), ({error: error}) 
        }
    },

    GetCategories: async function(req, res){
        try {            
        const categories = await db.Category.findAll({attributes:["id","name","detail"]})
            return res.status(200).json({
                count: categories.length,                
                categories: categories                
            });
        } 
        catch(error){
            return res.status(500), ({error: error}) 
        }        
    }
}