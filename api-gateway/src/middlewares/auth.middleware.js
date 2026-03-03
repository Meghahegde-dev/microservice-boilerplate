const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET } = require("../config");

module.exports = function authMiddleware(req, res, next) {
  // Check cookie first, then header
  const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);

    // Attach minimal user info
    req.user = { userId: decoded.userId, email: decoded.email };

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};