const express = require('express');
const router = express.Router();

const usersController = require('../controllers/userController')


router.get("/ingreso",usersController.formularioUsuario);

router.get("/registro",usersController.formularioRegistro);

router.get("/perfil/:userId",usersController.perfilUsuario);

router.get("/carrito",usersController.carrito);

module.exports = router;
