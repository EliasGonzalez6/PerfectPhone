const express = require('express');
const router = express.Router();
const product = require('../controllers/product');
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

router.get("/",product.index)

router.get("/create",product.create)

router.get("/:id",product.show)

router.get("/edit/:id",product.edit)

//router.post("/save",[upload.single("image")],validations,product.save)

router.patch("/update/:id",[upload.single("image")],product.update)

router.delete("/delete/:id",product.delete)

//procesar el registro
router.post("/save", [upload.single('image')], validations, product.save);

module.exports = router