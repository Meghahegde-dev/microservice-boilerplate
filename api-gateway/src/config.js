require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  SERVICES: {
    AUTH: process.env.AUTH_SERVICE_URL,

  }
};
