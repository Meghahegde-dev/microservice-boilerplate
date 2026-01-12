// const express = require("express");
// require("dotenv").config();
// const connectDB = require("./db/db-connection.js");
// const routes = require("./routes/route.js");
// const cookieParser = require("cookie-parser");
// const logger = require("./utils/logger");

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// connectDB();

// app.use("/", routes);

// app.get("/", (req, res) => {
//   res.send("Auth Service is running!");
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   logger.info(`Server running on port ${PORT}`);
// });

const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./db/db-connection");
const { connectEvents } = require("./events/rabbitmq-connection");
const routes = require("./routes/route");
const logger = require("./utils/logger");

const start = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await connectDB();

    // 2️⃣ Connect to RabbitMQ
     connectEvents();


    // 4️⃣ Start HTTP server
    const app = express();

    app.use(express.json());
    app.use(cookieParser());

    app.use("/", routes);

    app.get("/", (req, res) => {
      res.send("Auth Service is running!");
    });

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start User Service", error);
    process.exit(1);
  }
};

start();
