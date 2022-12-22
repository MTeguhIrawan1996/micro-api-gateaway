const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();
const reviewsController = require("./handler/reviews");

router.post("/", verifyToken, reviewsController.create);
router.put("/:id", verifyToken, reviewsController.update);
router.delete("/:id", verifyToken, reviewsController.destroy);

module.exports = router;
