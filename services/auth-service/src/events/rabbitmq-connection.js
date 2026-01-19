const amqp = require("amqplib");
const logger = require("../utils/logger");

let channel;

const connectEvents = async () => {
  let connected = false;
  while (!connected) {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      channel = await connection.createChannel();
      await channel.assertQueue("user.created", { durable: true });
      
      logger.info("✅ RabbitMQ connected and queue ready");
      connected = true; // Exit loop
    } catch (error) {
      logger.error("❌ RabbitMQ connection failed, retrying in 5s...", error.message);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};


module.exports = { connectEvents };
