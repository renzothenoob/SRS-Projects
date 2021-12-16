const { authUser } = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.route("/login").post(authUser);

module.exports = router;