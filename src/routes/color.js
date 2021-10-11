const express = require('express');
const router = express.Router();
const colorController = require("../controllers/colorController");

router.get("/",colorController.listado)

router.get("/create",colorController.create)

router.post("/create",colorController.save)

router.get("/edit/:id",colorController.edit)

router.post("/edit/:id",colorController.update)

router.post("/delete/:id",colorController.delete)

module.exports = router