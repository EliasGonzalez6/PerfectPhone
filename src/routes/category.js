const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/",categoryController.listado)

router.get("/create",categoryController.create)

router.get("/update/:id",categoryController.update)

router.delete("/delete/:id",categoryController.delete)

module.exports = router