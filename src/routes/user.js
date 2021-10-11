const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/",userController.listado)

router.get("/detail/:id",userController.detail)

router.get("/create",userController.create)

router.post("/create",userController.save)

router.get("/edit/:id",userController.edit)

router.post("/edit/:id",userController.update)

router.post("/delete/:id",userController.delete)

module.exports = router