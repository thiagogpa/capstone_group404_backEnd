const { logger } = require("../config/logger");
const withAuth = require("../middleware/middleware");
const withStaffAuth = require("../middleware/middlewareStaff");

module.exports = (app) => {
  const address = require("../controllers/address.controller");
  var router = require("express").Router();

  try {
    // Create a new Address
    router.post("/", async (req, res) => {
      await address.create(req, res);
    });

    // Delete an Address by id
    router.delete("/:id", async (req, res) => {
      await address.delete(req, res);
    });

    // Update an Address by id
    router.put("/:id", async (req, res) => {
      await address.update(req, res);
    });

    app.use("/api/address", router);
  } catch (error) {
    logger.error("Error while calling API: " + error.message);
  }
};
