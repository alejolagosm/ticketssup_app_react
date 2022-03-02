const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import the userModel
const User = require('../models/userModel');

// function to generate user token
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc Register a new User
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include fields');
  }

  //   Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Unable to create the user');
  }
});

// @desc Login User
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //   Check user and password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Credentials do not match any existing user');
  }
});

// @desc Get info from User
// @route /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
