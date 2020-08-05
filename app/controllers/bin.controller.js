const db = require("../config/db.config");
const Bin = db.bins;
const Op = db.Sequelize.Op;
const { QueryTypes } = require("sequelize");
const { logger } = require("../config/logger");

// Create and Save a new Bin
exports.create = async (req, res) => {
  logger.trace("Calling Bin Creation Api");

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Bin
  const bin = {
    wasteType: req.body.wasteType,
    sizeLong: req.body.sizeLong,
    sizeHeight: req.body.sizeHeight,
    sizeWide: req.body.sizeWide,
    dailyCost: req.body.dailyCost,
    description: req.body.description,
    amount: req.body.amount,
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
exports.findAll = async (req, res) => {
  logger.trace("Calling Bin FindAll Api");

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
exports.findOne = async (req, res) => {
  logger.trace("Calling Bin FindOne Api");

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
exports.update = async (req, res) => {
  logger.trace("Calling Bin update Api");

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
exports.delete = async (req, res) => {
  logger.trace("Calling Bin Delete Api");

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
exports.deleteAll = async (req, res) => {
  logger.trace("Calling Bin Delete All Api");

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
exports.findAllPublished = async (req, res) => {
  logger.trace("Calling Bin FindAll Api");

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

// Retrieve all Bin available by date range.
exports.findAvailable = async (req, res) => {
  logger.trace("Calling Bin Find Available Api");

  const { dateFrom: dateFrom, dateTo: dateTo } = req.body;

  if (dateFrom == null || dateTo == null) {    
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  };

  const select = `SELECT b.*, (b.amount - IFNULL(c.unavailable,0)) as 'available' FROM bins b
    left join (
      SELECT SUM(ob.selected) as 'unavailable', bin_id FROM orders
      JOIN ordersbins ob ON orders.id = ob.order_id
        WHERE (pick_up_date between '${dateFrom}' and '${dateTo}')
        or (drop_off_date between '${dateFrom}' and '${dateTo}')
        or (drop_off_date <= '${dateFrom}' and pick_up_date >= '${dateTo}')
      GROUP BY bin_id) c
   on bin_id = id
    WHERE
    deleted_at is null
    AND (b.amount - IFNULL(c.unavailable,0)) > 0
   `;

  const users = await db.sequelize.query(select, {
    model: Bin,
    mapToModel: true,
  });

  res.send(users);
};
