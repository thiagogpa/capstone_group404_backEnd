module.exports = (sequelize, Sequelize) => {

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

  return Login;
};
