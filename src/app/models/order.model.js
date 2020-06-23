module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize"); // Import the built-in data types

  const Client = require("./client.model")(sequelize, Sequelize);
  const OrderStatus = require("./order.status")(sequelize, Sequelize);

  const Order = sequelize.define(
    "order",
    {
      orderDate: {
        field: "order_date",
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { msg: "Order date must be provided." },
        },
      },
      dropOffDate: {
        field: "drop_off_date",
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { msg: "Drop off date must be provided." },
        },
      },
      pickUpDate: {
        field: "pick_up_date",
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

  Order.belongsTo(Client, {
    foreignKey: "client_id",
  });

  Order.belongsTo(OrderStatus, {
    foreignKey: "status_id",
  });

  return Order;
};
