const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a new user
//@route /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;

  //Validation
  if (!name || !email || !password || !address) {
    res.status(404);
    throw new Error("Plesae fill the all fields");
  }

  // Find if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    email,
    address,
    password: hashedPassword,
  });

  const { _id: id, photoURL } = user;

  const token2 = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      photoURL: user.photoURL,
      token2: token2,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Login a user
//@route /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user in db
  const user = await User.findOne({ email });
  const { _id: id, name, photoURL } = user;
  const token2 = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      photoURL: user.photoURL,
      token2: token2,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

//@desc Get current user
//@route /api/users/me
//@access private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    address: req.user.address,
  };
  res.status(200).json(user);
});
//@desc Update  user ticket
//@route PUT /api/tickets/:id
//@access private
const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await User.findOneAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        address: req.body.address,
      },
    },
    {
      new: true,
    }
  );

  res.status(200).json(updatedUser);
});
// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, getMe, updateUser };
