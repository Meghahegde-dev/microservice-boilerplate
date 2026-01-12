const Outbox = require("../db/schema/user-outbox-schema");
const { publishUserCreated } = require("../events/publishers/user-created-publisher");


setInterval(async () => {
  const events = await Outbox.find({ status: "PENDING" });

  for (const event of events) {
    await publishUserCreated(event.payload);
    event.status = "SENT";
    await event.save();
  }
}, 3000);
