const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes
router.get("/",userController.listado)

router.get("/detail/:id",userController.detail)

router.get("/create",userController.create)

router.post("/create", uploadFile.single('avatar'), validations, userController.save)

router.get("/edit/:id",userController.edit)

router.post("/edit/:id", uploadFile.single('avatar'), validations, userController.update)

router.post("/delete/:id",userController.delete)


//formulario de registro
router.get("/register", userController.register);

//procesar el registro
router.post("/register", uploadFile.single('avatar'), validations, userController.processRegister);

//formulario de ingreso
router.get("/login", guestMiddleware, userController.login);

//procesar de ingreso
router.post("/login",userController.loginProcess);

// Perfil de Usuario
router.get('/profile', authMiddleware, userController.profile);

// Logout
router.get('/logout', userController.logout);

//carrito
router.get("/carrito",userController.carrito);

module.exports = router