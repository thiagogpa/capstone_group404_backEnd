module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize"); // Import the built-in data types
  
  const Order = sequelize.define(
    "order",
    {
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { msg: "Order date must be provided." },
        },
      },
      dropOffDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { msg: "Drop off date must be provided." },
        },
      },
      pickUpDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { msg: "Pick up date must be provided." },
        },
      },
      subtotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          isFloat: { msg: "Subtotal must be provided" },
        },
      },
      taxes: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          isFloat: { msg: "Taxes must be provided" },
        },
      },
    }
  );

  return Order;
};
