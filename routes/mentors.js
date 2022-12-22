const express = require("express");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");
const router = express.Router();
const mentorHandler = require("./handler/mentors");

router.post("/", verifyToken, verifyAdmin, mentorHandler.create);
router.get("/", verifyToken, verifyAdmin, mentorHandler.getAll);
router.get("/:id", verifyToken, verifyAdmin, mentorHandler.getById);
router.delete("/:id", verifyToken, verifyAdmin, mentorHandler.destroy);
router.put("/:id", verifyToken, verifyAdmin, mentorHandler.update);

module.exports = router;
