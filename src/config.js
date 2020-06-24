const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_NAME: process.env.SERVER_NAME,

  SERVER_LOG_LEVEL: process.env.SERVER_LOG_LEVEL,
  SERVER_LOG_CATEGORY: process.env.SERVER_LOG_CATEGORY,
  SERVER_LOG_FILE: process.env.SERVER_LOG_FILE,

  SERVER_LOG_SEQUELIZE: process.env.SERVER_LOG_SEQUELIZE,

  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_SCHEMA: process.env.DB_SCHEMA,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,

  DB_LOG_SEQUELIZE: process.env.DB_LOG_SEQUELIZE,

  DB_RESET_ON_SERVER_START: process.env.DB_RESET_ON_SERVER_START,

  PRIVATE_KEY: process.env.PRIVATE_KEY,
};
