const db = require("../config/db.config");
const User = db.users;
const Address = db.addresses;
const Op = db.Sequelize.Op;
const { logger } = require("../config/logger");

const bcrypt = require("bcrypt");

/**************************************************************************************************************/
// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  logger.trace("Calling Users FindAll Api");

  //If the username is provided it gets based on that, otherwise it gets all the users

  try {
    await User.findAll({
      include: [
        {
          model: Address,
        },
      ],
    })
      .then((data) => {
        return res.send(data);
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message || "Some error occurred while retrieving Users.",
        });
      });
  } catch (error) {
    return res.status(500).send({
      message: "Some error occurred while trying to retrieve the data",
      error: error.message,
    });
  }
};

/**************************************************************************************************************/

// Find a single Login with an id
exports.findOne = async (req, res) => {
  logger.trace("Calling User FindOne Api");

  const userId = req.params.id;

  await User.findByPk(userId, {
    include: [
      {
        model: Address,
      },
    ],
  })
    .then((data) => {
      if (data) res.send(data);
      else
        res.status(404).send({
          message: "No User matches the id = " + userId,
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id = " + userId,
        error: err.error,
      });
    });
};

/**************************************************************************************************************/
