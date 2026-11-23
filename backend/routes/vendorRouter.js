const express = require('express');
const { createCategoty, getAllCategory, createSubCategory, getAllSubCategory, getAllCategoryWiseSubCategory, getAllOwnerWiseCategory } = require('../controllers/vendorController');
const { createProduct } = require('../controllers/productController');

const _ = express.Router();

//category and subcategory
_.post("/create/category",createCategoty)
_.post("/create/subcategory",createSubCategory)
_.get("/all/category",getAllCategory)
_.get("/all/subcategory",getAllSubCategory)
_.get("/all/category/:id/subcategory",getAllCategoryWiseSubCategory)
_.get("/user/:id/category",getAllOwnerWiseCategory)


//product


_.post("/create/product",createProduct)



module.exports = _
