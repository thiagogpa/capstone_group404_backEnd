module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("address", {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Street must be provided." },
        len: {
          args: [0, 100],
          msg: "Street cannot have more than 100 characters.",
        },
      },
    },
    numberStreet: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Street must be provided." },
        len: {
          args: [0, 100],
          msg: "Street cannot have more than 100 characters.",
        },
      },
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "City must be provided." },
        len: {
          args: [0, 45],
          msg: "City cannot have more than 45 characters.",
        },
      },
    },
    province: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "City must be provided." },
        len: {
          args: [0, 45],
          msg: "City cannot have more than 45 characters.",
        },
      },
    },
    zipcode: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "City must be provided." },
        len: { args: [0, 6], msg: "City cannot have more than 6 characters." },
      },
    },
  });

  return Address;
};
