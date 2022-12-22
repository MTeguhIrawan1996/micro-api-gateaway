const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "Your are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err)
      return next(createError(403, `Token is not valid - ${err.message}`));
    req.decode = decode.data;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.decode.id == req.params.id) {
      next();
    } else {
      return next(createError(403, "Token is not authorized"));
    }
  });
};

const verifyLogOut = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    return next(createError(403, "Access forbidden"));
  } else {
    next();
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.decode.role == "admin") {
      next();
    } else {
      return next(createError(403, "Token is not authorized"));
    }
  });
};

module.exports = { verifyUser, verifyAdmin, verifyToken, verifyLogOut };
