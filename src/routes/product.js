const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require('multer');
const path = require('path');

const validations = require('../middlewares/validateCreateProductMiddleware');

let dest = multer.diskStorage({
    destination: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        if(extension.indexOf("jpg") > 0){
            cb(null, path.resolve(__dirname,"../../public/uploads","products"))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})
const upload = multer({storage:dest});

router.get("/",productController.listado);

router.get("/detalle/:id",productController.detail);

router.get("/buscar/:busqueda",productController.buscar)

router.get("/productlista",productController.productlista);

router.get("/create",productController.create);

router.post("/create", [upload.single('image')], validations, productController.save);
/********************/

router.get("/edit/:id",productController.edit)

router.post("/edit/:id",productController.update)

router.post("/delete/:id",productController.delete)

module.exports = router