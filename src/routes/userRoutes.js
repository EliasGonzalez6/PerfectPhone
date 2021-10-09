const express = require('express');
const router = express.Router();
const path = require('path');

const usersController = require('../controllers/userController')

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//formulario de registro
router.get("/register", usersController.register);

//procesar el registro
router.post("/register", uploadFile.single('avatar'), validations, usersController.processRegister);

//formulario de ingreso
router.get("/login", guestMiddleware, usersController.login);

//procesar de ingreso
router.post("/login",usersController.loginProcess);

// Perfil de Usuario
router.get('/profile/', authMiddleware, usersController.profile);

// Logout
router.get('/logout/', usersController.logout);

//carrito
router.get("/carrito",usersController.carrito);

module.exports = router;
