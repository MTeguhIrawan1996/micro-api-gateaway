const express = require("express");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");
const router = express.Router();
const chaptersHandler = require("./handler/chapters");

router.post("/", verifyToken, verifyAdmin, chaptersHandler.create);
router.put("/:id", verifyToken, verifyAdmin, chaptersHandler.update);
router.delete("/:id", verifyToken, verifyAdmin, chaptersHandler.destroy);
router.get("/", verifyToken, chaptersHandler.getAll);
router.get("/:id", verifyToken, chaptersHandler.getById);

module.exports = router;
