const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const multer = require("multer");
const cors = require("cors");

require("dotenv").config();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orderPayments");
const coursesRouter = require("./routes/courses");
const mentorsRouter = require("./routes/mentors");
const chaptersRouter = require("./routes/chapters");
const lessosnRouter = require("./routes/lessons");
const imageCoursesRouter = require("./routes/imageCourses");
const myCoursesRouter = require("./routes/myCourses");
const reviewsRouter = require("./routes/reviews");
const webhookRouter = require("./routes/webhook");
const mediaRouter = require("./routes/media");
const refreshTokenRouter = require("./routes/refreshTokens");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(multer().single("image"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/webhooks", webhookRouter);
app.use("/courses", coursesRouter);
app.use("/mentors", mentorsRouter);
app.use("/chapters", chaptersRouter);
app.use("/lessons", lessosnRouter);
app.use("/image-courses", imageCoursesRouter);
app.use("/my-courses", myCoursesRouter);
app.use("/reviews", reviewsRouter);
app.use("/media", mediaRouter);
app.use("/refresh_tokens", refreshTokenRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went Wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

module.exports = app;
