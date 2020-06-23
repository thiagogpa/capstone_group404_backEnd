module.exports = {
  HOST: "192.168.0.100",
  USER: "wallup",
  PASSWORD: "Unv0R9qOQxS1FuL8",
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
