const express = require('express');
const router = express.Router();

const usersController = require('../controllers/userController')

//formulario de ingreso
router.get("/ingreso",usersController.formularioUsuario);

//formulario de registro
router.get("/registro",usersController.formularioRegistro);

//procesar registro
router.get("/registro",usersController.formularioRegistro);

router.get("/perfil/:userId",usersController.perfilUsuario);

router.get("/carrito",usersController.carrito);

module.exports = router;
