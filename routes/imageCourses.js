const express = require("express");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");
const router = express.Router();
const imageCoursesHandler = require("./handler/imageCourses");

router.post("/", verifyToken, verifyAdmin, imageCoursesHandler.create);
router.delete("/:id", verifyToken, verifyAdmin, imageCoursesHandler.destroy);

module.exports = router;
