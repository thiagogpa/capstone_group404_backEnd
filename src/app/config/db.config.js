module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "123456",
  DB: "wallup",
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
