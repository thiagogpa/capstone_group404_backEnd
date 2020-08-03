const {
  FRONTEND_DOMAIN,
  NODE_ENV,
  SERVER_PORT,
  DB_RESET_ON_SERVER_START,
} = require("./config");

const { logger } = require("./app/config/logger");

const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express();
(withAuth = require("./app/middleware/middleware")),
  (cookieParser = require("cookie-parser")),
  (db = require("./app/config/db.config"));

app.use(cookieParser());

var corsOptions = {
  origin: `${FRONTEND_DOMAIN}`,
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS,PUT",
  credentials: true, // required to pass
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
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

app.get("/", function (req, res) {
  return res.send("Server is up !");
});

app.get("/checkToken", withAuth, function (req, res) {
  logger.trace("CheckToken API");
  res.sendStatus(200);
});


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//Payment using Stripe
app.post('/payment', (req, res) => {
  logger.trace("Calling Stripe Payment API");
  const body = {
    source: req.body.stripeToken.id,
    amount: parseInt(req.body.amount),
    currency: 'cad'
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
      logger.debug("Stripe Response 500")
    } else {
      res.status(200).send({ success: stripeRes });
      logger.debug("Stripe Response 200")
    }
  });
});


//defines routes
require("./app/routes/routes")(app);

// set port, listen for requests
var port = process.env.PORT || SERVER_PORT;
var server = app.listen(port, () => {
  logger.info(`Server started on port=${port} environment=${NODE_ENV}.`);
});

module.exports = server;
