const db = require("../models");
const Login = db.login;
const Op = db.Sequelize.Op;
const { logger } = require("../config/logger");

const bcrypt = require("bcrypt");

// Create and Save a new Login
exports.create = (req, res) => {
  logger.trace("Calling Login Creation Api");

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Creates a Login
  const login = {
    username: req.body.username,
    password: req.body.password,
  };

  const saltRounds = 10;
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash(login.password, salt);
    })
    .then((hash) => {
      login.password = hash;

      // Save Login in the database
      Login.create(login)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Login.",
          });
        });
    })
    .catch((err) => console.error(err.message));
};

// Retrieve all Login from the database.
exports.findAll = (req, res) => {
  logger.trace("Calling Login FindAll Api");

  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Login.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Login.",
      });
    });
};

// Delete a Login with the specified id in the request
exports.delete = (req, res) => {
  logger.trace("Calling Login Delete Api");

  const username = req.params.username;

  Login.destroy({
    where: { id: username },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Login was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Login with username=${username}. Maybe Login was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Login with username=" + username,
      });
    });
};

// Delete all Login from the database.
exports.deleteAll = (req, res) => {
  logger.trace("Calling Login Delete All Api");

  Login.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Login were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Logins.",
      });
    });
};

// Find a single Login with an id
exports.findOne = (req, res) => {
  logger.trace("Calling Login FindOne Api");

  const username = req.params.username;

  Login.findByPk(username)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Login with username=" + username,
      });
    });
};
