const express = require("express");
const {
  createCategoty,
  getAllCategory,
  createSubCategory,
  getAllSubCategory,
  getAllCategoryWiseSubCategory,
  getAllOwnerWiseCategory,
  createCategory,
} = require("../controllers/vendorController");
const { createProduct } = require("../controllers/productController");
const multer = require("multer");
const _ = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {

    let uniqueName = `eco-${Date.now()}`
    
    cb(null,uniqueName + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage });

//category and subcategory
_.post("/create/category", createCategory);
_.post("/create/subcategory", createSubCategory);
_.get("/all/category", getAllCategory);
_.get("/all/subcategory", getAllSubCategory);
_.get("/all/category/:id/subcategory", getAllCategoryWiseSubCategory);
_.get("/user/:id/category", getAllOwnerWiseCategory);

//product
_.post("/create/product",upload.array('photo'),createProduct);

module.exports = _;
