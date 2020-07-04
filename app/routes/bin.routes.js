module.exports = app => {
  const bin = require("../controllers/bin.controller");

  var router = require("express").Router();

  // Create a new Bin
  router.post("/", bin.create);

  // Retrieve all Bin
  router.get("/", bin.findAll);

  // Retrieve all published Bin
  router.get("/published", bin.findAllPublished);

  // Retrieve a single Bin with id
  router.get("/:id", bin.findOne);

  // Update a Bin with id
  router.put("/:id", bin.update);

  // Delete a Bin with id
  router.delete("/:id", bin.delete);

  // Create a new Bin
  router.delete("/", bin.deleteAll);

  app.use('/api/bin', router);
};
