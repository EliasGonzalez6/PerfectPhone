const express = require("express");
const router = express.Router();
const path = require("path");

const apiController = require ("../controllers/api")

router.get("/users",apiController.users);

router.get("/users/:id",apiController.userId);

router.get("/products",apiController.products);

router.get("/products/:id",apiController.productId);

module.exports=router