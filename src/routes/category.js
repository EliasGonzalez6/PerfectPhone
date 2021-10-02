const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/create", categoryController.create);

module.exports = router