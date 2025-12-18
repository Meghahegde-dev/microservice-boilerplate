require("dotenv").config();
const mongoose = require("mongoose");
const { User, Tenant } = require("./schema-model");

const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/auth_service";

async function initDB() {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected (init)");

    const defaultTenant = await Tenant.findOne({ name: "Default Tenant" });
    if (!defaultTenant) {
      await Tenant.create({ name: "Default Tenant", domain: "default.com" });
      console.log("Inserted default tenant");
    }

    console.log("MongoDB initialized successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error initializing MongoDB:", err);
    process.exit(1);
  }
}

initDB();
