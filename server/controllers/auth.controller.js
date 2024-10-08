const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// generate accessToken
const generateAccessToken = (userId) =>
  jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "72h" });

// Signup
const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already Exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Registration Successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and Password are required" });
  }

  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ succes: false, message: "Invalid Credentials" });
  }

  const accessToken = generateAccessToken(user._id);

  return res.status(200).json({
    success: true,
    message: "Login Succesfully",
    user: {
      fullName: user.fullName,
      email: user.email,
    },
    accessToken,
  });
};

// get user
const getUser = async (req,res) =>{
  const { userId } = req.user;

  const isUser = await User.findOne({ _id: userId });
  if(!isUser){
    return res.sendStatus(401);
  }

  return res.json({ success:true, user:isUser });
}

module.exports = {
  signup,
  login,
  getUser
};
