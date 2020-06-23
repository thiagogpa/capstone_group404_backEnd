module.exports = (app) => {
  const login = require("../controllers/login.controller");

  var router = require("express").Router();

  // Create a new Logins
  router.post("/", login.create);

  // Retrieve all Logins
  router.get("/", login.findAll);

  // Authenticate using username
  //router.get("/authenticate", login.authenticate);

  // Retrieve a single Login with username
  router.get("/:username", login.findOne);

  // Delete a Bin with id
  router.delete("/:id", login.delete);

  // Create a new Bin
  router.delete("/", login.deleteAll);

  app.use("/api/login", router);
};
