module.exports = (sequelize, Sequelize) => { 
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "User First Name must be provided." },
        len: {
          args: [3, 45],
          msg: "First Name length must be between 3 and 45 characters.",
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "User Last Name must be provided." },
        len: {
          args: [3, 100],
          msg: "Last Name length must be between 3 and 100 characters.",
        },
      },
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "User phone must be provided." },
        isNumeric: true,
        len: {
          args: [11, 15],
          msg: "User Phone number must be between 11 and 15 characters.",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0, 45],
          msg: "Customer email cannot have more than 45 characters.",
        },
        isEmail: true,
      },
    },
  });

  return User;
};
