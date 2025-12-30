const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI ;
    console.log("Connecting to:", process.env.MONGO_URI);
    await mongoose.connect(mongoUri);
    logger.info("MongoDB connected (server)");
  } catch (err) {
    logger.error("MongoDB connection failed", {
      error: err.message,
      stack: err.stack,
    });
    process.exit(1);
  }
};

module.exports = connectDB;
