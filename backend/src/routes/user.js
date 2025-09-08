const express = require("express");
const router = express.Router();

// Controllers
const { profile } = require("../controllers");
const { authorization } = require("../middleware/authorization");

router.route("/profile").get(authorization, profile);

module.exports = router;
