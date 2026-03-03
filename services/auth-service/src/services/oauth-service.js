const User = require("../db/schema/user-schema");
const jwt = require("jsonwebtoken");

const handleGoogleUser = async (profile) => {
  // 1️⃣ Find user by email
  let user = await User.findOne({ email: profile.emails[0].value });

  // 2️⃣ Create user if not exists
  if (!user) {
    user = await User.create({
      email: profile.emails[0].value,
      provider: "google",
    });
  }

  // 3️⃣ Generate JWT tokens
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
  );

  return { user, accessToken, refreshToken };
};

module.exports = { handleGoogleUser };