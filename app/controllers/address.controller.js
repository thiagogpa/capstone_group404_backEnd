const db = require("../config/db.config");
const Address = db.addresses;
const Op = db.Sequelize.Op;
const { logger } = require("../config/logger");

/**************************************************************************************************************/

// Delete an Address with the specified id in the request
exports.delete = async (req, res) => {
  logger.trace("Calling Address Delete Api");

  const addressID = req.params.id;

  try {
    Address.destroy({
      where: { id: addressID },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Address was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Address with id=${id}. Maybe it was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Bin with id=" + id,
        });
      });
  } catch (error) {
    logger.error(error);
    res.status(500).send({
      message: "Some error occurred while deleting the Address",
      error: error.message,
    });
  }
};

/**************************************************************************************************************/

// Update a User by the id in the request
exports.update = async (req, res) => {
  logger.trace("Calling User update Api");

  const addressID = req.params.id;

  try {
    await db.sequelize.transaction(async (t) => {
      logger.debug("Updating user");
      await Address.update(req.body, {
        where: { id: addressID },
      }).then((num) => {
        if (num == 1) {
          res.send({
            message: "Address was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update addressID = ${addressID}. Maybe Address was not found or req.body is empty!`,
          });
        }
      });
    });
  } catch (error) {
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
    res.status(500).send({
      message: "Some error occurred while updating the Address",
      error: error.message,
    });
  }
};

/**************************************************************************************************************/

// Create and Save a new Address
exports.create = async (req, res) => {
  logger.trace("Calling Address Creation Api");

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Creates an Address
  let newAddress = {
    userId: req.body.userId,
    street: req.body.street,
    numberStreet: req.body.numberStreet,
    city: req.body.city,
    province: req.body.province,
    zipcode: req.body.zipcode,    
  };

  try {
    currentModel = "Address";
    await db.sequelize.transaction(async (t) => {
      logger.debug("Creating Address");
      // Save Address in the database
      await Address.create(newAddress, { transaction: t }).then((data) => {
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
};
