const {
  DB_HOST,
  DB_PORT,
  DB_SCHEMA,
  DB_USERNAME,
  DB_PASSWORD,
} = require("../../config");

module.exports = {
  HOST: DB_HOST,
  USER: DB_USERNAME,
  PASSWORD: DB_PASSWORD,
  DB: DB_SCHEMA,
  dialect: "mysql",
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // global model definitions
  define: {
    freezeTableName: false,
    timestamps: false, // createAt and updateAt columns
  },
};
