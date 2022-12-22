const apiAdapter = require("../../apiAdapter");

const api = apiAdapter(process.env.URL_SERVICE_USER);

module.exports = async (req, res) => {
  const id = req.decode.id;
  try {
    const user = await api.post("/users/logout", { user_id: id });
    res
      .cookie("access_token", "none", {
        expires: new Date(Date.now() + 3 * 1000),
        httpOnly: true,
      })
      .cookie("refresh_token", "none", {
        expires: new Date(Date.now() + 3 * 1000),
        httpOnly: true,
      })
      .json(user.data);
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
