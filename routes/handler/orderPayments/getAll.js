const apiAdapter = require("../../apiAdapter");

const api = apiAdapter(process.env.URL_SERVICE_ORDER);

module.exports = async (req, res) => {
  try {
    const userId = req.decode.id;

    const media = await api.get("/api/orders", {
      params: { user_id: userId },
    });
    return res.json(media.data);
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
