const express = require('express');
const router = express.Router();
const rolController = require("../controllers/rolController");

router.get("/",rolController.listado)

router.get("/create",rolController.create)

router.post("/create",rolController.save)

router.get("/edit/:id",rolController.edit)

router.post("/edit/:id",rolController.update)

router.post("/delete/:id",rolController.delete)

module.exports = router