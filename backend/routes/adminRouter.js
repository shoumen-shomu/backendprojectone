const express = require('express');
const { alluserController, singleUser, activeUser, deactiveUser, updateUser, deleteuser } = require('../controllers/adminController');


const _ = express.Router();


_.post('/all-user',alluserController)
_.post('/user/:id',singleUser)
_.post('/active/user',activeUser)
_.post('/deactive/user',deactiveUser)
_.post('/update/user/:id',updateUser)
_.post('/delete/user/:id',deleteuser)



module.exports = _
