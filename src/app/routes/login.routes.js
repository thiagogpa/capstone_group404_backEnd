const { logger } = require("../config/logger");

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
    router.delete("/:username", async (req, res) => {
      res.json(await login.delete(req, res));
    });

    // Delete all logins    
    router.delete("/", async (req, res) => {
      res.json(await login.deleteAll(req, res));
    });

    app.use("/api/login", router);

  } catch (error) {
    logger.error("Error while calling API: " + error.message);
  }
};
