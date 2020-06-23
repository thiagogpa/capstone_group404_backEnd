const db = require("../models");
const Login = db.login;
const { logger } = require("../config/logger");
const bcrypt = require("bcrypt");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");

const secret = "mysecretsshhh";

// Authenticate the provided user
exports.authenticate = (req, res) => {
 

  logger.debug("Calling Login Authenticate Api");

  const { username: providedUsername, password: providedPassword } = req.body;

  Login.findByPk(providedUsername)
    .then((data) => {
      //it means it ran successfully, but its still necessary to check if the user was found
      if (data != null) {
        //Will try to match the provided password with the hash
        bcrypt
          .compare(providedPassword, data.password)
          .then((match) => {
            logger.debug("Match = " + match);
            if (match) {
              //Password DID match / Issue token
              logger.debug("CREATING COOKIE")
              const payload = { providedUsername };
              const token = jwt.sign(payload, secret, {
                expiresIn: "1h",
              });
              res.cookie("token", token, { httpOnly: true }).sendStatus(200);
            } else {
              //Password did NOT match
              logger.debug("ERROR 1");
              res.status(401).json({
                error: "Incorrect email or password",
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message:
                "Error retrieving Login with username=" + providedUsername,
            });
          });
      } else {
        //It means the username was not found on the database
        logger.debug("ERROR 2");
        res.status(401).json({
          error: "Incorrect email or password",
        });
      }
    })
    .catch((err) => {
      //It means there was a problem while looking for the username
      res.status(500).send({
        message: "Error retrieving Login with username=" + providedUsername,
      });
    });
};
