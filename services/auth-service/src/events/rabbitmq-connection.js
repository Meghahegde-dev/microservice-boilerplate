const amqp = require("amqplib");
const logger = require("../utils/logger");

let channel;

const connectEvents = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);

    channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue("user.created", { durable: true });

    logger.info("✅ RabbitMQ connected and queue ready");
  } catch (error) {
    logger.error("❌ RabbitMQ connection failed, retrying...", error);
    // Retry instead of exiting immediately
    await new Promise(res => setTimeout(res, 3000));
    return connectEvents();
  }
};


module.exports = { connectEvents };
