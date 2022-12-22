const express = require("express");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");
const router = express.Router();
const lessonsHandler = require("./handler/lessons");

router.post("/", verifyToken, verifyAdmin, lessonsHandler.create);
router.put("/:id", verifyToken, verifyAdmin, lessonsHandler.update);
router.delete("/:id", verifyToken, verifyAdmin, lessonsHandler.destroy);
router.get("/", verifyToken, lessonsHandler.getAll);
router.get("/:id", verifyToken, lessonsHandler.getById);

module.exports = router;
