const asyncHanler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generateToken = () => {
  return jwt.sign({ id }, process.env.JWT_SECRETKEY, { expiresIn: "1d" });
};

const registerUser = asyncHanler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw newError("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw newError("Password must be up to 6 characters");
  }

  // Check if user exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("Email has already been created");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate Token
  const token = generateToken(user._id);

  if (user) {
    const { _id, name, email, role } = user;
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      //   secure: true,
      //   sameSite: none,
    });

    // Send user data
    res.status(201).json({
      _id,
      name,
      email,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  res.send("Register user...");
});

module.exports = {
  registerUser,
};
