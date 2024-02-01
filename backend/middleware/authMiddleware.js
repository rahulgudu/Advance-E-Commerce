const asyncHanler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHanler(async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            res.status(401);
            throw new Error("Not authorized, please login");
        }

        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRETKEY);

        // get user id from the token
        const user = await User.findById(verified.id).select("-password");

        if(!user){
            res.status(401);
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, please login");
    }
});

module.exports = {
    protect
}