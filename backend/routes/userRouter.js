const express = require('express');
const { userController, updateProfile } = require('../controllers/userController');
const _ = express.Router();


_.get('/alluser',userController)
_.post('/update/:id',updateProfile)




module.exports = _

