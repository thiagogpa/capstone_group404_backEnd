const { logger } = require("../config/logger");
const withAuth = require("../middleware/middleware");
const withStaffAuth = require("../middleware/middlewareStaff");

module.exports = (app) => {
  const user = require("../controllers/user.controller");
  var router = require("express").Router();

  try {
    // Retrieve all Users
    router.get("/", async (req, res) => {
      await user.findAll(req, res);
    });

    // Retrieve a single User with id
    router.get("/:id", async (req, res) => {
      await user.findOne(req, res);
    });

    app.use("/api/user", router);
  } catch (error) {
    logger.error("Error while calling API: " + error.message);
  }
};
