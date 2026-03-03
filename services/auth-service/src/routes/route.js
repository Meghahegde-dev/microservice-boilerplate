const express = require("express");
const {signupController} = require("../controllers/sign-up-controller.js");
const {signinController} = require("../controllers/sign-in-controller.js");
const refreshController = require("../controllers/refresh-token-controller.js");
const logoutController = require("../controllers/logout-controller.js");
const { googleLogin, googleCallback } = require("../controllers/oauth-controller");


const router = express.Router();

router.post("/signup", signupController);
router.post("/signin", signinController);
router.post("/refresh", refreshController);
router.post("/logout", logoutController);

// Update these paths to match your Proxy's pathRewrite:
router.get("/google-login", googleLogin);    // Matches proxy rewrite: ^/auth/google -> /google-login
router.get("/google-callback", googleCallback); // Matches proxy rewrite: ^/auth/google/callback -> /google-callback

router.get("/success", (req, res) => {
  res.send("OAuth Success 🎉");
});

module.exports = router;
