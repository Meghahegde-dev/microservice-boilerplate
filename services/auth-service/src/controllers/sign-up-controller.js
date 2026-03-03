const { signupService } = require("../services/sign-up-service");
const logger = require("../utils/logger");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await signupService({ email, password });

    res.status(201).json({
      message: "User signed up successfully. Please log in.",
      user: { email: user.email, provider: user.provider },
    });
  } catch (err) {
    logger.error("Signup failed:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

module.exports = { signupController };