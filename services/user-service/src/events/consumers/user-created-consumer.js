const { getChannel } = require("../rabbitmq-connection");
const UserProfile = require("../../db/schema/user-profile-schema");

const startUserCreatedConsumer = async () => {
  const channel = getChannel(); // reuse the shared channel

  const QUEUE = "user.created";

  await channel.assertQueue(QUEUE, { durable: true });

  channel.consume(QUEUE, async (msg) => {
    const { authUserId, email } = JSON.parse(msg.content.toString());

    try {
      await UserProfile.findOneAndUpdate(
        { authUserId },
        { $setOnInsert: { authUserId, email } },
        { upsert: true }
      );

      channel.ack(msg);
    } catch (err) {
      console.error("User profile creation failed", err);
      channel.nack(msg, false, true); // retry
    }
  });

  console.log("📥 UserCreated consumer started");
};

module.exports = startUserCreatedConsumer;
