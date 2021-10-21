const express = require('express');
const router = express.Router();
const brandController = require("../controllers/brandController");

router.get("/",brandController.listado)

router.get("/create",brandController.create)

router.post("/create",brandController.save)

router.get("/edit/:id",brandController.edit)

router.post("/edit/:id",brandController.update)

router.post("/delete/:id",brandController.delete)

module.exports = router