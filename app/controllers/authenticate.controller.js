const db = require("../config/db.config");
const Login = db.logins;
const { logger } = require("../config/logger");
const bcrypt = require("bcrypt");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");

const { PUBLIC_KEY, PRIVATE_KEY } = require("./../../config");

// Authenticate the provided user
exports.authenticate = (req, res) => {
  logger.trace("Calling Login Authenticate Api");

  const { username: providedUsername, password: providedPassword } = req.body;

  Login.findByPk(providedUsername, {
    include: [
      {
        model: db.users,
      },
    ],
  })
    .then((data) => {
      //it means it ran successfully, but its still necessary to check if the user was found
      if (data != null) {
        let staff = data.user.staff;
        let userId = data.user.id;
        //Will try to match the provided password with the hash
        bcrypt
          .compare(providedPassword, data.password)
          .then((match) => {
            logger.debug("Match = " + match);
            if (match) {
              //Password DID match / Issue token
              logger.debug("CREATING COOKIE");
              const payload = { staff, providedUsername };
              const token = jwt.sign(payload, PRIVATE_KEY, {
                expiresIn: "12h",
              });
              res
                .cookie("token", token, { httpOnly: true })
                .status(200)
                .send({ isStaff: staff, userId: userId });
            } else {
              //Password did NOT match
              logger.debug("Password did not match");
              res.status(401).json({
                error: "Incorrect email or password",
              });
            }
          })
          .catch((err) => {
            logger.error(
              "Error retrieving Login with username=" + providedUsername
            );
            res.status(500).send({
              message:
                "Error retrieving Login with username=" + providedUsername,
            });
          });
      } else {
        //It means the username was not found on the database
        logger.debug("Incorrect email or password");
        res.status(401).json({
          error: "Incorrect email or password",
        });
      }
    })
    .catch((err) => {
      //It means there was a problem while looking for the username
      logger.error("Error retrieving Login with username=" + providedUsername);
      res.status(500).send({
        message: "Error retrieving Login with username=" + providedUsername,
      });
    });
};

// Authenticate the provided user
exports.logoff = (req, res) => {
  logger.debug("Logging Off");
  res.cookie("token", null, { httpOnly: true }).sendStatus(200);
};
