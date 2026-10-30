require('node:dns').setServers(['1.1.1.1','8.8.8.8'])
require('dotenv').config()
const express = require('express')
const app = express()
const mongodbConfig = require("./config/dbConnection")
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const vendorRouter = require('./routes/vendorRouter')
const {adminmiddleware,vendormiddleware} = require('./middleware/roleMiddleware')



app.use(express.json())
mongodbConfig()

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',usermiddleware,userRouter)
app.use('/api/v1/admin',adminmiddleware,adminRouter)
app.use('/api/v1/vendor',vendormiddleware,vendorRouter)

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})