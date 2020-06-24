const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  SERVER_PORT,
  SERVER_NAME,
  DB_RESET_ON_SERVER_START,
} = require("./config");

const app = express();

const withAuth = require("./app/middleware/middleware");

const { logger } = require("./app/config/logger");

const cookieParser = require("cookie-parser");

app.use(cookieParser());

var corsOptions = {
  origin: `${SERVER_NAME}:${SERVER_PORT}`,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

if (JSON.parse(DB_RESET_ON_SERVER_START)){
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

app.get("/faq", (req, res) => {
  logger.trace("FAQ API");
  res.json([
    {
      id: 0,
      name: "What happens to the junk after you haul it away?",
      answer:
        "We do everything we can to recycle or donate all possible materials, and we're proud to say that up to 60% of our loads are diverted away from landfills. We offer appliance and fridge disposal, drywall recycling, and construction recycling in addition to metal, clean wood, and computer recycling. Toronto’s licensed disposal facilities take care of everything that cannot be donated or recycled.",
    },
    {
      id: 1,
      name: "What forms of payment do you accept?",
      answer: "We accept Visa and Mastercard.",
    },
    {
      id: 2,
      name: "Will you damage my driveway when you deliver my self-service bin?",
      answer:
        "We take several precautions to make sure your driveway does not sustain damage. We put down plywood to offer a layer of protection and use a modern system of delivery to place the bin down very gently, thus preventing impact damage. We also offer mini bins for smaller jobs.",
    },
    {
      id: 3,
      name:
        "Why are the delivery and pick-up day not included in my self-service rental?",
      answer:
        "In short, to make sure you don’t get over-charged. We will deliver your bin anywhere from 7 a.m. to 9 p.m., and we cannot guarantee that you will have a full day’s use of the bin on either the pick up or delivery day. It doesn’t seem fair to charge you for use of the bin for only part of the day, so we don’t charge you at all for those days.",
    },
    {
      id: 4,
      name: "How do I know what the weight will be for my self-service bin?",
      answer:
        "We’ll weigh it for you at a third-party facility on a federally inspected scale. They will provide us with an official ticket, which we will present to you with the bill.",
    },
    {
      id: 5,
      name:
        "Do I need to be at the location when you deliver or pick up the garbage container?",
      answer:
        "No. Just let us know you will not be at the location and we’ll make sure we deliver and pick up your bin, garbage container, or mini bins in the right place. We can arrange all payments over the phone.",
    },
    {
      id: 6,
      name: "What Junk Do We Take?",
      answer:
        "We handle everything from fridge disposal to construction recycling, and we take all materials excepting hazardous waste. We take care of basic trash collection and garbage pickup as well. Here’s a brief list of some common junk removal items: – Furniture – desks, filing cabinets, dresses, mattresses, couches, sofabeds, armchairs – Appliances – washers, dryers, fridges, freezers, computers, fax machines, stereos, TVs – Household items – dishes, clothing, tools, boxes, lawn mowers – Construction and renovation materials – drywall, plaster, tiles, glass, concrete, shingles – Wood – pressure treated and regular lumber, fencing, plywood, firewood – Yard waste – leaves, branches, dirt, grass, sod, soil, dirt, clay, compost – Concrete – driveway concrete, pathway concrete, basement floor concrete, asphalt We cannot take hazardous waste such as propane tanks, batteries, paint, asbestos, oil, solvents, or bio-medical waste. If you’re not certain whether your materials are hazardous, please ask for a complete list of materials that we are not allowed to take.",
    },
  ]);
});

//defines routes
require("./app/routes/routes")(app);

// set port, listen for requests
var server = app.listen(SERVER_PORT, () => {
  logger.info(`Server is running on port ${SERVER_PORT}.`);
});



module.exports = server;
