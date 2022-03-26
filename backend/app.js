const express = require('express')
var cors = require('cors')


//const path = require('path')
//require('dotenv').config({path:path.resolve(__dirname, './dev.env') })



require('./db/mongoose')


const authRoute = require("./routes/auth");





const app = express()
app.use(cors())

app.use(express.json())


app.use("/api/user", authRoute);



module.exports = app