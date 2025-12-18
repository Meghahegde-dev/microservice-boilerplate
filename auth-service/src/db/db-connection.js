const mongoose = require("mongoose");

const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/auth_service";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected (server)");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
