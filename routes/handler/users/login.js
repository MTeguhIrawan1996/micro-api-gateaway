const apiAdapter = require("../../apiAdapter");
const jwt = require("jsonwebtoken");

const api = apiAdapter(process.env.URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const user = await api.post("/users/login", req.body);
    const data = user.data.details;

    const token = jwt.sign({ data }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXP,
    });

    const refreshToken = jwt.sign(
      { data },
      process.env.JWT_SECRET_REFRESH_TOKEN,
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXP,
      }
    );

    const { details, ...other } = user.data;

    await api.post("/refresh_tokens/created", {
      token: refreshToken,
      user_id: data.id,
    });

    return res
      .cookie("access_token", token, { httpOnly: true })
      .cookie("refresh_token", refreshToken, { httpOnly: true })
      .json({ ...other });
  } catch (err) {
    if (err.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: 500, message: "Service unvailable" });
    }
    const { status, data } = err.response;
    return res.status(status).json(data);
  }
};
