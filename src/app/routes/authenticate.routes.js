module.exports = (app) => {
  const login = require("../controllers/authenticate.controller");

  var router = require("express").Router();

  // Authenticate using username
  router.post("/authenticate", login.authenticate);

  app.use("/api/", router);
};
