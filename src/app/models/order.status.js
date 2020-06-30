module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize"); // Import the built-in data types

  const OrderStatus = sequelize.define(
    "order_status",
    {
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description must be provided." },
          len: {
            args: [0, 30],
            msg: "Description cannot have more than 30 characters.",
          },
        },
      },
    }
  );

  return OrderStatus;
};
