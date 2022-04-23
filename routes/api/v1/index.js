const express = require("express");
const categoryController = require("../../../src/controllers/categoryController");
const productController = require("../../../src/controllers/productController");
const userController = require("../../../src/controllers/userController");

let router= express.Router();
router.get("/category/all", categoryController.listCategories);
router.get("/products/all",userController.isAuthenticated, productController.listProducts);

router.post("/products/add",userController.isAuthenticated, productController.addProduct);
router.post("/user/signup",userController.signup);
router.post("/user/login",userController.login);


module.exports = router;