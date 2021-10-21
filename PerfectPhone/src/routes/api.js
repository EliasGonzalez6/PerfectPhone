const express = require("express");
const router = express.Router();
const path = require("path");

const apiController = require ("../controllers/api")

router.get("/user",apiController.GetUsers);

router.get("/user/:id",apiController.GetUserId);

router.get("/lastUser",apiController.GetlastUser);

router.get("/product",apiController.GetProducts);

router.get("/product/:id",apiController.GetProductId);

router.get("/lastProduct",apiController.GetlastProduct);

router.get("/category",apiController.GetCategories);

router.get("/lastCategory",apiController.GetlastCategory);



module.exports=router