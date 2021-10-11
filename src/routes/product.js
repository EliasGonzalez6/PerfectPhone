const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/",productController.listado)

router.get("/create",productController.create)

router.post("/create",productController.save)

router.get("/edit/:id",productController.edit)

router.post("/edit/:id",productController.update)

router.post("/delete/:id",productController.delete)

module.exports = router