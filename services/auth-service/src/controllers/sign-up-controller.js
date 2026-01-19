const User = require("../db/schema/user-schema");
const Outbox = require("../db/schema/user-outbox-schema");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Hash the password manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 1️⃣ Create the User
    // Change this line:
    const user = await User.create({ email, password: hashedPassword });

    // 2️⃣ Save the EVENT to an Outbox collection
    await Outbox.create({
      eventType: "user.created",
      payload: { authUserId: user._id.toString(), email },
      status: "PENDING",
    });

    res.status(201).json({ message: "User signed up" });
  } catch (err) {
    logger.error("Signup failed:", err);
    res.status(500).json({ message: "Signup failed: " + err });
  }
};

module.exports = signupController;
