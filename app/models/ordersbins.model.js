module.exports = (sequelize, Sequelize) => {
    const { DataTypes } = require("sequelize"); // Import the built-in data types
    Order = require("../models/order.model");
    Bin = require("../models/bin.model");

    const OrdersBins = sequelize.define("ordersbins", {  
      selected: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "amount of bins must be provided" },
        },
      },
    });
  
    return OrdersBins;
  };
  