require('node:dns').setServers(['1.1.1.1','8.8.8.8'])
require('dotenv').config()
const express = require('express')
const app = express()
const mongodbConfig = require("./config/dbConnection")
const authRouter = require('./routes/authRouter')

app.use(express.json())
mongodbConfig()

app.use('/api/v1/auth',authRouter)

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})