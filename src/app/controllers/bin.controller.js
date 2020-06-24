const db = require("../models");
const Bin = db.bin;
const Op = db.Sequelize.Op;
const { logger } = require("../config/logger");

// Create and Save a new Bin
exports.create = (req, res) => {
  logger.trace('Calling Bin Creation Api');

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Bin
  const bin = {
    sizeLong: req.body.sizeLong,
    sizeHeight: req.body.sizeHeight,
    sizeWide: req.body.sizeWide,
    dailyCost: req.body.dailyCost,
    description: req.body.description,
  };

  // Save Bin in the database
  Bin.create(bin)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Bin.",
      });
    });
};

// Retrieve all Bin from the database.
exports.findAll = (req, res) => {
  logger.trace('Calling Bin FindAll Api');

  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Bin.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bin.",
      });
    });
};

// Find a single Bin with an id
exports.findOne = (req, res) => {
  logger.trace('Calling Bin FindOne Api');

  const id = req.params.id;

  Bin.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Bin with id=" + id,
      });
    });
};

// Update a Bin by the id in the request
exports.update = (req, res) => {
  logger.trace('Calling Bin update Api');

  const id = req.params.id;

  Bin.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Bin was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Bin with id=${id}. Maybe Bin was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Bin with id=" + id,
      });
    });
};

// Delete a Bin with the specified id in the request
exports.delete = (req, res) => {
  logger.trace('Calling Bin Delete Api');

  const id = req.params.id;

  Bin.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Bin was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Bin with id=${id}. Maybe Bin was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Bin with id=" + id,
      });
    });
};

// Delete all Bin from the database.
exports.deleteAll = (req, res) => {
  logger.trace('Calling Bin Delete All Api');

  Bin.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Bin were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Bins.",
      });
    });
};

// find all published Bin ***** THIS IS AN EXAMPLE IT WILL NOT WORK WITH THIS DATABASE
exports.findAllPublished = (req, res) => {
  logger.trace('Calling Bin FindAll Api');

  Bin.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Bins.",
      });
    });
};
