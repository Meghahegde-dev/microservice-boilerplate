const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./db/db-connection");
const { connectEvents } = require("./events/rabbitmq-connection"); 
const startUserCreatedConsumer = require("./events/consumers/user-created-consumer");
const routes = require("./routes/route");
const logger = require("./utils/logger");

const start = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await connectDB();

    // 2️⃣ Connect to RabbitMQ
    await connectEvents();

    // 3️⃣ Start event consumers
    await startUserCreatedConsumer();

    // 4️⃣ Start HTTP server
    const app = express();

    app.use(express.json());
    app.use(cookieParser());

    app.use("/", routes);

    app.get("/", (req, res) => {
      res.send("User Service is running!");
    });

    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => {
      logger.info(`User service running on ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start User Service", error);
    process.exit(1);
  }
};

start();
