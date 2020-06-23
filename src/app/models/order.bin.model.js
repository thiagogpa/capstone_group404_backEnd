module.exports = (sequelize, Sequelize) => {
  const Bin = require("./bin.model")(sequelize, Sequelize);
  const Order = require("./order.model")(sequelize, Sequelize);

  const OrderBin = sequelize.define(
    "order_bin",
    {
      OrderId: {
        field: "order_id",
        type: Sequelize.INTEGER,
        references: {
          model: Order,
          key: "id",
        },
      },
      BinId: {
        field: "bin_id",
        type: Sequelize.INTEGER,
        references: {
          model: Bin,
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  return OrderBin;
};
