const User = require("../models/userModel");
const { setUser } = require("../services/auth");

async function handleSignup(req, res) {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({ message: "User created successfully", user: user });
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields" });
  }
  const user = await User.findOne({ email: email, password: password });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = setUser(user);
  res.cookie("uid", token);
  return res.status(200).json({ message: "Login successful", user: user });
}

module.exports = { handleSignup, handleLogin };
