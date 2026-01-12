const mongoose = require("mongoose");

const outboxSchema = new mongoose.Schema({
  type: String,
  payload: Object,
  status: { type: String, default: "PENDING" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Outbox", outboxSchema);
