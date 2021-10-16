const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require('multer');
const path = require('path');

// Middlewares
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

let dest = multer.diskStorage({
    destination: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        if(extension.indexOf("jpg") > 0){
            cb(null, path.resolve(__dirname,"../../public/images","avatars"))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})
const upload = multer({storage:dest});

// Routes
router.get("/",userController.listado)

router.get("/detail/:id",userController.detail)

router.get("/create",userController.create)

router.post("/create", [upload.single('avatar')], validations, userController.save)

router.get("/edit/:id",userController.edit)

router.post("/edit/:id", [upload.single('avatar')], validations, userController.update)

router.get("/editprofile/:id",userController.editprofile)

router.post("/editprofile/:id", [upload.single('avatar')], validations, userController.updateprofile)

router.post("/delete/:id",userController.delete)


//formulario de registro
router.get("/register", userController.register);

//procesar el registro
router.post("/register", [upload.single('avatar')], validations, userController.processRegister);

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