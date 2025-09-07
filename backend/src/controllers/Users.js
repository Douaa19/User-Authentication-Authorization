const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcryptjs");

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
        role: { name: role },
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
    } else {
      res.status(400).json({ message: "This email is already registered." });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occurred while registering the user." });
  }
};

// login method
const handleLogin = async (req, res) => {
  let data = "";
  let {
    email = req.body.email,
    username = req.body.username,
    password = req.body.password,
  } = data;

  const isEmail = (email) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };

  if (!isEmail(email)) {
    username = req.body.email;
  }

  try {
    const user = await User.findOne(username ? { username } : { email });
    if (!user) {
      return res.status(404).json({ message: "Credentials are invalid" });
    } else {
      await user.comparePasswords(password).then((result) => {
        if (result) {
          const id = user._id;
          const username = user.username;
          const role = user.role;
          const myToken = jwt.sign(
            { id, username, role },
            process.env.JWT_ACCESS_SECRET
          );
          if (myToken) {
            console.log({ myToken });
            return res.json({ myToken });
          } else {
            console.log("Token was not created");
            return res.json({ message: "Token was not created" });
          }
        } else {
          console.log("Password is incorrect");
          res.status(404).json({ message: "Password is incorrect" });
        }
      });
    }
  } catch (error) {
    console.log("An error occurred");
    return res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
};
