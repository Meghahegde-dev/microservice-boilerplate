const User = require("../db/schema/user-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signinService = async (email, password) => {
  if (!email || !password) {
    throw { status: 400, message: "Email and password are required" };
  }

  const user = await User.findOne({ email });
  if (!user) throw { status: 401, message: "Invalid credentials" };

  if (user.provider !== "local") {
    throw { status: 400, message: `Please sign in using ${user.provider}` };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { status: 401, message: "Invalid credentials" };

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

  return { 
    accessToken, 
    refreshToken, 
    user: { email: user.email, provider: user.provider } 
  };
};

module.exports = { signinService };