module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize"); // Import the built-in data types

  const Bin = require("./bin.model")(sequelize, Sequelize);

  const BinAvailability = sequelize.define(
    "bin_availability",
    {
      dateFrom: {
        field: "date_from",
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
      },
      binId: {
        field: "bind_id",
        type: Sequelize.INTEGER,
        references: {
          model: Bin,
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["date_from", "bind_id"],
        },
      ],
    }
  );

  /*
  Bin.hasMany(BinAvailability, {
    foreignKey: "bin_id"
  });
  */

  return BinAvailability;
};
