const User = require("../db/schema/user-schema");
const Outbox = require("../db/schema/user-outbox-schema");
const bcrypt = require("bcrypt");

const signupService = async ({ email, password }) => {
  // 1️⃣ Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 2️⃣ Create user
  const user = await User.create({
    email,
    password: hashedPassword,
    provider:"local"
  });

  // 3️⃣ Create outbox event
  await Outbox.create({
    eventType: "user.created",
    payload: {
      authUserId: user._id.toString(),
      email,
    },
    status: "PENDING",
  });

  return user;
};

module.exports = {
  signupService,
};