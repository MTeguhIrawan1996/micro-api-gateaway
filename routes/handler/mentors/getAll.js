const apiAdapter = require("../../apiAdapter");

const api = apiAdapter(process.env.URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
  try {
    const result = await api.get("/api/mentors");
    return res.json(result.data);
  } catch (err) {
    if (err.code === "ECONNREFUSED")
      return next(createError(500, "Service Unvailable"));

    const { status, data } = err.response;
    return res.status(status).json(data);
  }
};
