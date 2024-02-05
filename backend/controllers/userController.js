const asyncHanler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETKEY, { expiresIn: "1d" });
};

const registerUser = asyncHanler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
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

// Login User
const loginUser = asyncHanler(async (req, res) => {
  const { email, password } = req.body;

  //Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  // Check if exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist");
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // Generate token
  const token = generateToken(user._id);
  if (user && passwordIsCorrect) {
    const newUser = await User.findOne({ email }).select("-password");
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      //   secure: true,
      //   sameSite: none,
    });

    // Send user data
    res.status(201).json(newUser);
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const logout = asyncHanler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    //   secure: true,
    //   sameSite: none,
  });
  res.status(200).json({message : "Successfully logged out"});
});

// Get User
const getUser = asyncHanler(async(req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if(user){
    res.status(200).json(user);
  } else{
    res.status(400)
    throw new Error('User not found');
  }
});

// Get login status
const getLoginStatus = asyncHanler(async(req, res) => {
  const token = req.cookies.token;
  if(!token){
    res.json(false);
  }

  // Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRETKEY);
  if (!verified) {
    res.json(false)
  } else{
    res.json(true)
  }
});

// Update User
const updateUser = asyncHanler(async(req, res) => {
  const user = await User.findById(req.user._id);

  if(user){
    const { name, phone, address } = user;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;

    const updateUser = await user.save();
    res.status(200).json(updateUser);
  } else{
    res.status(404);
    throw new Error("User don't exist");
  }
});

// Update User Photo
const updatePhoto = asyncHanler (async(req, res) => {
  const { photo } = req.body;
  const user = await User.findById(req.user._id);
  user.photo = photo;
  const  updatedUser = await user.save();
  res.status(200).json(updatedUser);
});


module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
};
