const apiAdapter = require("../../apiAdapter");

const api = apiAdapter(process.env.URL_SERVICE_MEDIA);

module.exports = async (req, res, next) => {
  const image = req.body;
  try {
    const media = await api.post("/media", image);
    return res.json(media.data);
  } catch (err) {
    if (err.code === "ECONNREFUSED")
      return next(createError(500, "Service Unvailable"));

    const { status, data } = err.response;
    return res.status(status).json(data);
  }
};
