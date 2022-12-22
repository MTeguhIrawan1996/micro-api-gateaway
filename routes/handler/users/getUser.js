const apiAdapter = require("../../apiAdapter");

const api = apiAdapter(process.env.URL_SERVICE_USER);

module.exports = async (req, res) => {
  const id = req.decode.id;
  try {
    const user = await api.get(`/users/${id}`);
    return res.json(user.data);
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
