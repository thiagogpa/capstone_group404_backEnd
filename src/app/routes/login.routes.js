module.exports = (app) => {
  const login = require("../controllers/login.controller");

  var router = require("express").Router();

  // Create a new Logins
  
  router.post("/", async (req, res) => {
    try {
      res.json(
        await login.create(req, res),
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  });


  // Retrieve all Logins
  router.get("/", async (req, res) => {
    try {
      res.json(
        await login.findAll(req, res),
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  });


  // Retrieve a single Login with username
  router.get("/:username", login.findOne);

  // Delete a Bin with id
  router.delete("/:id", login.delete);

  // Create a new Bin
  router.delete("/", login.deleteAll);

  app.use("/api/login", router);
};
