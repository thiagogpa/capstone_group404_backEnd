module.exports = (sequelize, Sequelize) => {
  const User = require("./user.model")(sequelize, Sequelize);

  const Client = sequelize.define("client", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    companyName: {
      field: "company_name",
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Login password must be provided." },
        len: {
          args: [3, 45],
          msg: "Login password length must be between 3 and 45 characters.",
        },
      },
    },
  });

  Client.belongsTo(User, {
    foreignKey: "user_id",
  });

  return Client;
};
