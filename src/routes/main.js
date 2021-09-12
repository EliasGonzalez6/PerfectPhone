const express = require('express');
const router = express.Router();
const main = require('../controllers/main');
const productos = require("../controllers/product");
const user = require("../controllers/userController");


router.get("/",main.home)
router.get("/about",main.home);

module.exports = router