const {
  SERVER_PORT,
  SERVER_NAME,
  DB_RESET_ON_SERVER_START,
} = require("./config");

const { logger } = require("./app/config/logger");

const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express(),
  withAuth = require("./app/middleware/middleware"),
  cookieParser = require("cookie-parser"),
  db = require("./app/config/db.config");

app.use(cookieParser());

var corsOptions = {
  origin: `${SERVER_NAME}:${SERVER_PORT}`,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

if (JSON.parse(DB_RESET_ON_SERVER_START)) {
  // drops the tables and recreate them
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db done.");
  });
} else {
  // only syncronizes the tables
  db.sequelize.sync();
}

app.get("/checkToken", withAuth, function (req, res) {
  logger.trace("CheckToken API");
  res.sendStatus(200);
});

//defines routes
require("./app/routes/routes")(app);

// set port, listen for requests
var server = app.listen(SERVER_PORT, () => {
  logger.info(`Server is running on port ${SERVER_PORT}.`);
});

module.exports = server;
