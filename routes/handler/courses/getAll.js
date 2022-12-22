const apiAdapter = require("../../apiAdapter");

const api = apiAdapter(process.env.URL_SERVICE_COURSE);

module.exports = async (req, res, next) => {
  try {
    const result = await api.get("/api/courses", {
      params: { ...req.query, status: "published" },
    });

    const coursesData = result.data;
    const firstPage = coursesData.details.first_page_url.split("?").pop();
    const lastPage = coursesData.details.last_page_url.split("?").pop();

    coursesData.details.first_page_url = `${process.env.HOSTNAMESS}/courses?${firstPage}`;
    coursesData.details.last_page_url = `${process.env.HOSTNAMESS}/courses?${lastPage}`;

    if (coursesData.details.next_page_url) {
      const nextPage = coursesData.details.next_page_url.split("?").pop();
      coursesData.details.next_page_url = `${process.env.HOSTNAMESS}/courses?${nextPage}`;
    }

    if (coursesData.details.prev_page_url) {
      const prevPage = coursesData.details.prev_page_url.split("?").pop();
      coursesData.details.prev_page_url = `${process.env.HOSTNAMESS}/courses?${prevPage}`;
    }

    coursesData.details.path = `${process.env.HOSTNAMESS}/courses`;

    return res.json(coursesData);
  } catch (err) {
    if (err.code === "ECONNREFUSED")
      return next(createError(500, "Service Unvailable"));

    const { status, data } = err.response;
    return res.status(status).json(data);
  }
};
