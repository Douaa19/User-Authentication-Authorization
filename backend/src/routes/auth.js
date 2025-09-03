const express = require("express");
const router = express.Router();

// Controllers
const { Users, uploadImage } = require("../controllers");

router
  .route("/register")
  .post(uploadImage.single("profile"), Users.handleRegister);

router.route("/login").post(Users.handleLogin);
