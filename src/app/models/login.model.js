module.exports = (sequelize, Sequelize) => {
  const User = require("./user.model")(sequelize, Sequelize);

  const Login = sequelize.define("login", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Login password must be provided." },
      },
    },
  });

  /* TEST THIAGO
  Login.belongsTo(User, {
    foreignKey: "user_id",
  });

  */

  return Login;
};
