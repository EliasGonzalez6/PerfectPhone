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

router.get("/",productController.listado)

router.get("/:id",productController.detail)

router.get("/create",productController.create)

router.post("/create",productController.save)

router.get("/edit/:id",productController.edit)

router.post("/edit/:id",productController.update)

router.post("/delete/:id",productController.delete)

module.exports = router