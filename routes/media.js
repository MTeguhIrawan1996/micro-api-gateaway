const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const mediaHandler = require("./handler/media");

router.post("/", verifyToken, mediaHandler.create);
router.get("/", verifyToken, mediaHandler.getAll);
router.put("/", verifyToken, mediaHandler.update);
router.delete("/:id", verifyToken, mediaHandler.destroy);

module.exports = router;
