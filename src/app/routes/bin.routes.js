module.exports = app => {
  const users = require("../controllers/bin.controller");

  var router = require("express").Router();

  // Create a new Bin
  router.post("/", users.create);

  // Retrieve all Bin
  router.get("/", users.findAll);

  // Retrieve all published Bin
  router.get("/published", users.findAllPublished);

  // Retrieve a single Bin with id
  router.get("/:id", users.findOne);

  // Update a Bin with id
  router.put("/:id", users.update);

  // Delete a Bin with id
  router.delete("/:id", users.delete);

  // Create a new Bin
  router.delete("/", users.deleteAll);

  app.use('/api/bin', router);
};
