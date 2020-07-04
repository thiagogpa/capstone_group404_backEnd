const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../../config");
const { logger } = require("../config/logger");

const withStaffAuth = function (req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;

  if (!token) {
    res.status(401).send({ message: "Unauthorized: No token provided" });
    logger.debug('Unauthorized: No token provided')
  } else {
    jwt.verify(token, PRIVATE_KEY, function (err, decoded) {
      if (err) {
        res.status(401).send({ message: "Unauthorized: Invalid token" });
        logger.debug('Unauthorized: Invalid token')
      } else {
        req.username = decoded.providedUsername;
        req.staff = decoded.staff;

        if (!req.staff) {
          logger.debug("Unauthorized: You are not allowed to perform this operation, only staff are allowed to")
          res
            .status(401)
            .send({
              message:
                "Unauthorized: You are not allowed to perform this operation, only staff are allowed to",
            });
        } else {
          next();
        }
      }
    });
  }
};

module.exports = withStaffAuth;
