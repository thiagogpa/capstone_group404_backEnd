const {
  DB_HOST,
  DB_PORT,
  DB_SCHEMA,
  DB_USERNAME,
  DB_PASSWORD,
  DB_LOG_SEQUELIZE,
} = require("../../config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB_SCHEMA, DB_USERNAME, DB_PASSWORD, {
  logging: JSON.parse(DB_LOG_SEQUELIZE),
  host: DB_HOST,
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  define: {
    paranoid: true,
    freezeTableName: false,
    timestamps: true, // createAt and updateAt columns
    underscored: true,
  },
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require("../models/user.model")(sequelize, Sequelize);
db.logins = require("../models/login.model")(sequelize, Sequelize);
db.addresses = require("../models/address.model")(sequelize, Sequelize);
db.orders = require("../models/order.model")(sequelize, Sequelize);
db.bins = require("../models/bin.model")(sequelize, Sequelize);
db.ordersBins=require("../models/ordersbins.model")(sequelize, Sequelize);

//Relations
db.users.hasOne(db.logins);
db.logins.belongsTo(db.users);
db.addresses.belongsTo(db.users);
db.users.hasMany(db.addresses);

db.orders.belongsTo(db.users);
db.users.hasMany(db.orders);

db.orders.belongsTo(db.addresses);
db.addresses.hasOne(db.orders);

db.orders.belongsToMany(db.bins, { through: db.ordersBins });
db.bins.belongsToMany(db.orders, { through: db.ordersBins });

module.exports = db;
