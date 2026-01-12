const User = require("../db/schema/user-schema");
const Outbox = require("../db/schema/user-outbox-schema"); 
const logger = require("../utils/logger");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Create the User
    const user = await User.create({ email, password });

    // 2️⃣ Save the EVENT to an Outbox collection
    await Outbox.create({
      eventType: 'user.created',
      payload: { authUserId: user._id.toString(), email },
      status: 'PENDING'
    });

    res.status(201).json({ message: "User signed up" });

  } catch (err) {
    logger.error("Signup failed:", err);
    res.status(500).json({ message: "Signup failed: " + err });
  }
};

module.exports = signupController;
