const createError = require("../utils/error");

module.exports = (...roles) => {
  return (req, res, next) => {
    const role = req.decode.role;

    if (!roles.includes(role)) {
      return next(createError(405, "Your are dont have permission!"));
    }

    return next();
  };
};
