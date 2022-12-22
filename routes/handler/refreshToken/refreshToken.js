const apiAdapter = require("../../apiAdapter");
const createError = require("../../../utils/error");
const jwt = require("jsonwebtoken");

const api = apiAdapter(process.env.URL_SERVICE_USER);

module.exports = async (req, res, next) => {
  const { refresh_token } = req.cookies;

  try {
    if (!refresh_token) {
      return next(createError(401, "Your are not authenticated!"));
    }
    await api.get("/refresh_tokens/getToken", {
      params: { refresh_token: refresh_token },
    });
    jwt.verify(
      refresh_token,
      process.env.JWT_SECRET_REFRESH_TOKEN,
      (err, decode) => {
        if (err)
          return next(createError(403, `Token is not valid - ${err.message}`));
        req.decode = decode.data;
      }
    );
    const data = req.decode;
    const token = jwt.sign({ data }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXP,
    });
    res.cookie("access_token", token, { httpOnly: true }).json(data);
  } catch (err) {
    if (err.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: 500, message: "Service unvailable" });
    }
    const { status, data } = err.response;
    return res.status(status).json({ data });
  }
};
