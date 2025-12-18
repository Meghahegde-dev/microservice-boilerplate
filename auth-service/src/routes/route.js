const express = require("express");
const signupController = require("../controllers/sign-up.js");
const signinController = require("../controllers/sign-in.js");
const refreshController = require("../controllers/refresh-token.js");
const logoutController = require("../controllers/logout.js");

const router = express.Router();

router.post("/signup", signupController);
router.post("/signin", signinController);
router.post("/refresh", refreshController);
router.post("/logout", logoutController);

module.exports = router;
