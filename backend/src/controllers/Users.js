const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");

// Register method
const handleRegister = async (req, res) => {
  const { username, email, role, password } = req.body;
  const profile_img = req.file.filename;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser === null) {
      const newUser = await User.create({
        username,
        email,
        role,
        password,
        profile_img,
      });

      if (newUser) {
        const id = newUser._id;
        const username = newUser.username;
        const role = newUser.role;
        const myToken = jwt.sign(
          { id, username, role },
          process.env.JWT_ACCESS_SECRET
        );
        res
          .status(200)
          .send({ messageSuccess: "User created successfully", myToken });
      } else {
        res.json({ message: "This email is already registered." });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occurred while registering the user." });
  }
};
