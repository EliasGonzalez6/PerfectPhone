const express = require('express');
const router = express.Router();

const usersController = require('../controllers/userController')


router.get("/formularioUsuario",usersController.formularioUsuario);

router.get("/formularioRegistro",usersController.formularioRegistro);

router.get("/perfilUsuario/:userId",usersController.perfilUsuario);

router.get("/carrito",usersController.carrito);

module.exports = router;
