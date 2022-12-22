const express = require("express");
const {
  verifyToken,

  verifyLogOut,
} = require("../middlewares/verifyToken");
const router = express.Router();
const usersHandler = require("./handler/users");

router.post("/register", usersHandler.register);
router.post("/login", verifyLogOut, usersHandler.login);
router.put("/:id", verifyToken, usersHandler.update);
router.get("/:id", verifyToken, usersHandler.getUser);
router.post("/logout", verifyToken, usersHandler.logout);

module.exports = router;
