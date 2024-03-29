const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 6969;

// MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));


// Routes 
app.use("/api/users", userRoutes);

app.get("/", (req, res)=>{
    res.send("Home Page");
});


// Error Handler
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch((err)=>console.log(err));