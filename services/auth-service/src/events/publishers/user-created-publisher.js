// src/events/user-created-publisher.js
const amqp = require("amqplib");
const logger = require("../../utils/logger");

let channel;
let pendingMessages = [];

/**
 * Connect to RabbitMQ and initialize the channel.
 * Retries automatically if RabbitMQ is not yet ready.
 */
const connectRabbitMQ = async () => {
  let connected = false;

  while (!connected) {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      channel = await connection.createChannel();

      // Ensure the queue exists
      await channel.assertQueue("user.created", { durable: true });
      logger.info("✅ RabbitMQ connected and queue ready");

      // Flush any messages that came in before channel was ready
      flushPendingMessages();

      connected = true;
    } catch (err) {
      logger.error("❌ RabbitMQ not ready, retrying in 3s...", err);
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
};

/**
 * Publish a 'user.created' message to RabbitMQ.
 * Buffers the message if channel isn't ready yet.
 */
const publishUserCreated = (payload) => {
  if (!channel) {
    pendingMessages.push(payload);
    return;
  }

  channel.sendToQueue(
    "user.created",
    Buffer.from(JSON.stringify(payload)),
    { persistent: true }
  );

  logger.info(`📤 user.created sent: ${payload.authUserId}`);
};

/**
 * Flush any messages that were buffered before the channel was ready
 */
const flushPendingMessages = () => {
  while (pendingMessages.length && channel) {
    publishUserCreated(pendingMessages.shift());
  }
};

module.exports = { connectRabbitMQ, publishUserCreated };
