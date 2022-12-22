const apiAdapter = require("../../apiAdapter");

const api = apiAdapter(process.env.URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
  const courseId = req.body.course_id;
  const userId = req.decode.id;
  try {
    const result = await api.post("/api/my-courses", {
      user_id: userId,
      course_id: courseId,
    });
    return res.json(result.data);
  } catch (err) {
    if (err.code === "ECONNREFUSED")
      return next(createError(500, "Service Unvailable"));

    const { status, data } = err.response;
    return res.status(status).json(data);
  }
};
