const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ================= SIGNUP =================
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User created",
      user,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. check password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3. generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. send response
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};