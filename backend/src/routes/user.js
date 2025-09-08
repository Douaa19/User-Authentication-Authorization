const express = require("express");
const router = express.Router();

// Controllers
const { profile, Users } = require("../controllers");
const { authorization } = require("../middleware/authorization");

router.route("/profile").get(authorization, profile);

router.route("/profile/update").put(authorization, Users.updateProfile);

router.route("/reset-password").put(authorization, Users.resetPassword);

module.exports = router;
