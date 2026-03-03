const { signinService } = require("../services/sign-in-service");
const logger = require("../utils/logger");

const signinController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call service
    const { accessToken, refreshToken, user } = await signinService(email, password);

    // Set tokens as secure, httpOnly cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Send user info only
    res.status(200).json({
      message: "Login successful",
      user
    });

  } catch (err) {
    logger.error("Login failed:", err);
    res.status(err.status || 500).json({ message: err.message || "Login failed" });
  }
};

module.exports = { signinController };