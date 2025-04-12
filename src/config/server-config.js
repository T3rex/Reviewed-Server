const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION: process.env.DB_CONNECTION,
  BCRYPT_SALTROUND: process.env.BCRYPT_SALTROUND || 10,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
};
