const apiAdapter = require("../../apiAdapter");

const api = apiAdapter(process.env.URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  const { id, image } = req.body;
  try {
    const media = await api.put("/media", { id: id, image: image });
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
