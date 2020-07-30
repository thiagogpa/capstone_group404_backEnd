const db = require("../config/db.config");
const User = db.users;
const Address = db.addresses;
const Login = db.logins;
const Op = db.Sequelize.Op;
const { logger } = require("../config/logger");

const bcrypt = require("bcrypt");

/**************************************************************************************************************/
// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  logger.trace("Calling Users FindAll Api");

  //If the username is provided it gets based on that, otherwise it gets all the users

  await User.findAll({
    include: [
      {
        model: Address,
      },
    ],
  })
    .then((data) => {
      const resObj = data.map((user) => {
        //tidy up the user data
        return Object.assign(
          {},
          {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            staff: user.staff,            
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
            addresses: user.addresses.map((addresses) => {
              //tidy up the post data
              return Object.assign(
                {},
                {
                  id: addresses.id,
                  street: addresses.street,
                  numberStreet: addresses.numberStreet,
                  city: addresses.city,
                  province: addresses.province,
                  zipcode: addresses.zipcode,
                  createdAt: addresses.createdAt,
                  updatedAt: addresses.updatedAt,
                  deletedAt: addresses.deletedAt,                  
                }
              );
            }),
          }
        );
      });
      res.send(data);

      //res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
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
      {
        model: Login,
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

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
  logger.trace("Calling User Delete Api");  

  const userID = req.params.id;

  let currentModel = null;
  try {
    await db.sequelize.transaction(async (t) => {
      currentModel = "Login";
      //Checks if there is a login with that username, otherwise stops here

      currentModel = "Login";
      await User.findByPk(userID, {
        include: [
          {
            model: Address,
          },
          {
            model: Login,
          },
        ],
        transaction: t,
      }).then((data) => {
        if (!data) {
          throw new Error("There was no login with the username = " + userID);
        }
        
        currentModel = "User";
        User.destroy(
          {
            where: { id: userID },
          },
          { transaction: t }
        );

        currentModel = "Address";
        Address.destroy(
          {
            where: { userId: userID },
          },
          { transaction: t }
        ).catch((err) => {
          throw err;
        });

        currentModel = "Login";
        Login.destroy(
          {
            where: { userId: userID },
          },
          { transaction: t }
        ).then(res.send({ message: "User was successfully deleted" }));
      });
    });
  } catch (error) {
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
    res.status(500).send({
      message: "Some error occurred while deleting the " + currentModel,
      error: error.message,
    });
  }
};