const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Role schema
const Role = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["admin", "user", "guest"],
    default: "user",
  },
});

const Users = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email format",
    ],
  },
  role: Role,
  sub_role: {
    type: String,
    required: true,
  },
  profile_img: {
    type: String,
    required: false,
    default: null,
  },
  password: {
    type: String,
    required: true,
    minlength: [5, "the password must be greater than 5 characters"],
  },
});

Users.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;
    next();
  });
});

Users.methods.comparePasswords = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", Users);

module.exports = Users;
