// Entry file
const express = require("express")
const mongoose = require("mongoose")
const cors= require("cors")
require('dotenv').config()

// middleware
const app = express()
app.use(express.json())
app.use(cors())

// static files accessibility
app.use("/uploads",express.static)

// register/login route
const userAuth = require("./routes/loginRoute")
app.use('/api/auth',userAuth)

// apartment routes
const apartment = require("./routes/apartmentRoutes")
app.use("/api/apartment",apartment)

// review routes
const review = require('./routes/reviewRoute')
app.use('/api/review',review)

// console.log("URI:",process.env.MONGO_URI)

// connection to the database
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongo Connected"))
.catch(err=>console.log("Mongo Connection error"))

const PORT = 3001
app.listen(PORT,()=>{
    console.log("Server running on port "+PORT+"...")
})