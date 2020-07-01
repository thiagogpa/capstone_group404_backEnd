const jwt = require("jsonwebtoken");
const { PUBLIC_KEY, PRIVATE_KEY } = require("../../config");
const { logger } = require("../config/logger");

const withStaffAuth = function (req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;

  if (!token) {
    res.status(401).send({ message: "Unauthorized: No token provided" });
  } else {
    jwt.verify(token, PRIVATE_KEY, function (err, decoded) {
      if (err) {
        res.status(401).send({ message: "Unauthorized: Invalid token" });
      } else {
        req.username = decoded.providedUsername;
        req.staff = decoded.staff;

        if (!req.staff) {
          res
            .status(401)
            .send({
              message:
                "Unauthorized: You are not allowed to perform this operation",
            });
        } else {
          next();
        }
      }
    });
  }
};

module.exports = withStaffAuth;
