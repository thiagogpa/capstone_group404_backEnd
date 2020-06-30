module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = require("sequelize"); // Import the built-in data types

  const Bin = sequelize.define("bin", {
    sizeLong: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Bin size long must be provided" },
      },
    },
    sizeHeight: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Bin size height must be provided" },
      },
    },
    sizeWide: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Bin size wide must be provided" },
      },
    },
    dailyCost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isFloat: { msg: "Bin daily cost must be provided" },
      },
    },
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
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return Bin;
};
