const express = require("express");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");
const router = express.Router();
const coursesHendler = require("./handler/courses");

router.post("/", verifyToken, verifyAdmin, coursesHendler.create);
router.put("/:id", verifyToken, verifyAdmin, coursesHendler.update);
router.delete("/:id", verifyToken, verifyAdmin, coursesHendler.destroy);
router.get("/", coursesHendler.getAll);
router.get("/:id", coursesHendler.getById);

module.exports = router;
