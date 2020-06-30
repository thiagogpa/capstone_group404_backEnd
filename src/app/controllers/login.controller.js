const db = require("../config/db.config");
const Login = db.logins;
const User = db.users;
const Address = db.addresses;
const Op = db.Sequelize.Op;
const { logger } = require("../config/logger");

const bcrypt = require("bcrypt");

// Create and Save a new Login
exports.create = async (req, res) => {
  logger.trace("Calling Login Creation Api");

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const isStaff = req.body.staff;

  // Creates a Login
  let newLogin = {
    username: req.body.login.username,
    password: req.body.login.password,
    userId: null,
  };

  let newUser = {
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    phone: req.body.user.phone,
    email: req.body.user.email,
    profileId: req.body.user.profileId,
  };

  //Address is only necessary if the new Login is not part of staff
  let newAddress;
  if (isStaff !== true) {
    newAddress = {
      street: req.body.address.street,
      numberStreet: req.body.address.numberStreet,
      city: req.body.address.city,
      province: req.body.address.province,
      zipcode: req.body.address.zipcode,
      userId: null,
    };
  }

  const saltRounds = 10;
  await bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash(newLogin.password, salt);
    })
    .then((hash) => {
      newLogin.password = hash;
    })
    .catch((err) => {
      logger.error(`Error while creating hash: ${err.message}`);
    });

  let currentModel = null;
  try {
    currentModel = "User";
    await db.sequelize.transaction(async (t) => {
      logger.debug("Creating user");
      // Save Login in the database
      await User.create(newUser, { transaction: t }).then((data) => {
        newLogin.userId = data.id;        
      });

      if (!isStaff) {
        logger.debug("Creating address");        
        currentModel = "Address";
        newAddress.userId = newLogin.userId;
        // Save Address in the database
        await Address.create(newAddress, { transaction: t });
      }

      currentModel = "Login";
      // Save Login in the database
      logger.debug("Creating login");
      await Login.create(newLogin, { transaction: t }).then((data) => {
        res.send(data);
      });
    });
  } catch (error) {
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
    res.status(500).send({
      message: "Some error occurred while creating the " + currentModel,
      error: error.message,
    });
  }

  logger.trace("DONE Calling Login Creation Api");
};

// Retrieve all Login from the database.
exports.findAll = async (req, res) => {
  logger.trace("Calling Login FindAll Api");

  //If the username is provided it gets based on that, otherwise it gets all the users
  const username = req.body.username;
  var condition = username ? { username: { [Op.eq]: `${username}` } } : null;

  try {
    await Login.findAll({
      where: condition,
      include: [
        {
          model: db.users,
          include: [
            {
              model: db.addresses,
            },
          ],
        },
      ],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Login.",
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while trying to retrieve the data",
      error: error.message,
    });
  }
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
