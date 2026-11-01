const express = require('express');
const { userController, updateProfile, createCategoty, getAllCategory } = require('../controllers/userController');
const _ = express.Router();


_.get('/product',userController)
_.post('/update/:id',updateProfile)
_.post("/create/category",createCategoty)
_.get("/all/category",getAllCategory)



module.exports = _

