const { logger } = require("../config/logger");
const withAuth = require("../middleware/middleware");
const withStaffAuth = require("../middleware/middlewareStaff");

module.exports = (app) => {
  const order = require("../controllers/order.controller");
  var router = require("express").Router();

  try {
    // Create a new Order
    router.post("/", async (req, res) => {
      await order.create(req, res);
    });

    // Retrieve all Order
    router.get("/", async (req, res) => {
      await order.findAll(req, res);
    });

    // Retrieve a single Order with id
    router.get("/:id", async (req, res) => {
      await order.findOne(req, res);
    });

    // Update a Order with id
    router.put("/:id", async (req, res) => {
      await order.update(req, res);
    });

    // Delete a Order with id
    router.delete("/:id", async (req, res) => {
      await order.delete(req, res);
    });

    // Create a new Order
    router.delete("/", async (req, res) => {
      await order.deleteAll(req, res);
    });

    app.use("/api/order", router);
  } catch (error) {
    logger.error("Error while calling API: " + error.message);
  }
};
