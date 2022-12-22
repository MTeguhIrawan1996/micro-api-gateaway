const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();
const orderHandler = require("./handler/orderPayments");

router.get("/", verifyToken, orderHandler.getAll);

module.exports = router;
