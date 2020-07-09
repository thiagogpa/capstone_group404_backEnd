const { logger } = require("../config/logger");
const withAuth = require("../middleware/middleware");
const withStaffAuth = require("../middleware/middlewareStaff");

module.exports = app => {
  const bin = require("../controllers/bin.controller");
  var router = require("express").Router();

  try {

    // Create a new Bin
    router.post("/", async (req, res) => {
      await bin.create(req, res);
    });

    // Retrieve all Bin
    router.get("/", async (req, res) => {
      await bin.findAll(req, res);
    });

    // Retrieve all published Bin
    router.get("/published", async (req, res) => {
      await bin.findAllPublished(req, res);
    });

    // Retrieve a single Bin with id
    router.get("/:id", async (req, res) => {
      await bin.findOne(req, res);
    });

    // Update a Bin with id
    router.put("/:id", async (req, res) => {
      await bin.update(req, res);
    });

    // Delete a Bin with id
    router.delete("/:id", withAuth, async (req, res) => {
      await bin.delete(req, res);
    });

    // Create a new Bin
    router.delete("/", async (req, res) => {
      await bin.deleteAll(req, res);
    });

    app.use('/api/bin', router);
  } catch (error) {
    logger.error("Error while calling API: " + error.message);
  }
};
