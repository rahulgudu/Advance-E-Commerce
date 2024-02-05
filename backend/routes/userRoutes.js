const express = require("express");
const { registerUser, loginUser, logout, getUser, getLoginStatus, updateUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/getLoginStatus", getLoginStatus);
router.patch("/updateUser",protect, updateUser);

module.exports = router;