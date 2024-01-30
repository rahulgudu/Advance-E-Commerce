const asyncHanler = require("express-async-handler");

const registerUser = asyncHanler (async(req, res) => {
    res.send("Register user...")
});

module.exports = {
    registerUser
}