const express = require('express');
const { createCategoty, getAllCategory, createSubCategory, getAllSubCategory, getAllCategoryWiseSubCategory, getAllOwnerWiseCategory } = require('../controllers/vendorController');
const { createProduct } = require('../controllers/productController');
const multer = require("multer")
const _ = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, file.fieldname + '-' + raw.toString('hex'))
    })
  }
})

const upload = multer({ storage: storage })

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
