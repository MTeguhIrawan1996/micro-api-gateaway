const express = require("express");
const router = express.Router();
const refreshTokens = require("./handler/refreshToken");

router.get("/", refreshTokens.refreshToken);

module.exports = router;
