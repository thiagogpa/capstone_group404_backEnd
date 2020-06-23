//Requires all the routes

module.exports = (app) => {
  require("./authenticate.routes")(app);
  require("./bin.routes")(app);
  require("./login.routes")(app);
};
