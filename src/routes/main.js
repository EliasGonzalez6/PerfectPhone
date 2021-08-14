const express = require('express');
const router = express.Router();
const main = require('../controllers/main');
const productos = require("../controllers/product");
const usuario = require("../controllers/usuario");

router.get("/",main.home)
router.get("/about",main.home);

router.get("/formularioUsuario",usuario.formularioUsuario);
router.get("/formularioRegistro",usuario.formularioRegistro);
router.get("/carrito",usuario.carrito);


module.exports = router