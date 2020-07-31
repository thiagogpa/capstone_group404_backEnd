//Requires all the routes

module.exports = (app) => {
  require("./authenticate.routes")(app);
  require("./bin.routes")(app);
  require("./login.routes")(app);
  require("./faq.routes")(app);
  require("./user.routes")(app);
  require("./order.routes")(app);
  require("./address.route")(app);
};
