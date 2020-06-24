const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  logging: false,
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },

  define: {
    freezeTableName: dbConfig.define.freezeTableName,
    timestamps: dbConfig.define.timestamps, // createAt and updateAt columns
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.address = require("./address.model")(sequelize, Sequelize);
db.profile = require("./profile.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.login = require("./login.model")(sequelize, Sequelize);
db.client = require("./client.model")(sequelize, Sequelize);
db.clientAddressHistory = require("./client.address.model")(sequelize, Sequelize);
db.bin = require("./bin.model")(sequelize, Sequelize);
db.binAvailability = require("./bin.availability")(sequelize, Sequelize);
db.order = require("./order.model")(sequelize, Sequelize);
db.orderStatus = require("./order.status")(sequelize, Sequelize);
db.orderBin = require("./order.bin.model")(sequelize, Sequelize);

module.exports = db;