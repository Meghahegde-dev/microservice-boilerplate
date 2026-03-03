const passport = require("passport");

const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

const googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, result) => {
    if (err || !result) return res.status(500).json({ message: "Auth failed" });

    const { accessToken, refreshToken } = result;

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 mins
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    // Redirect to frontend
    res.redirect("http://localhost:4000/success");
  })(req, res, next);
};

module.exports = { googleLogin, googleCallback };