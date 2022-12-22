const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();
const myCoursesHandler = require("./handler/myCourses");

router.post("/", verifyToken, myCoursesHandler.create);
router.get("/", verifyToken, myCoursesHandler.getAll);

module.exports = router;
