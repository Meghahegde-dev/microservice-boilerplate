const amqp = require("amqplib");
const logger = require("../utils/logger");

let channel;

const connectEvents = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    logger.info("✅ RabbitMQ connected");
  } catch (error) {
    logger.error("❌ RabbitMQ connection failed", error);
    process.exit(1);
  }
};

const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }
  return channel;
};

module.exports = { connectEvents, getChannel };
