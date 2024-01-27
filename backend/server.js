const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 6969;


// Routes 
app.get("/", (req, res)=>{
    res.send("Home Page");
});


mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch((err)=>console.log(err));