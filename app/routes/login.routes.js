const { logger } = require("../config/logger");
const withAuth = require("../middleware/middleware");
const withStaffAuth = require("../middleware/middlewareStaff");


module.exports = (app) => {
  const login = require("../controllers/login.controller");
  var router = require("express").Router();

  try {
    // Create a new Login
    router.post("/", async (req, res) => {
      res.json(await login.create(req, res));
    });

    // Retrieve all Logins
    router.get("/", async (req, res) => {
      res.json(await login.findAll(req, res));
    });

    // Retrieve a single Login with username
    router.get("/:username", async (req, res) => {
      res.json(await login.findOne(req, res));
    });

    // Delete a Login by username
    router.delete("/:username", withStaffAuth, async (req, res) => {
      res.json(await login.delete(req, res));
    });

    // Update a Login by username
    router.put("/:username", async (req, res) => {
      res.json(await login.update(req, res));
    });

    app.use("/api/login", router);
  } catch (error) {
    logger.error("Error while calling API: " + error.message);
  }
};
