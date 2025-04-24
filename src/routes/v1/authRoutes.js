const express = require("express");
const router = express.Router();
const {
  createUser,
  signIn,
  loginStatus,
  logout,
} = require("../../controllers/user-controller");
const { authRequestValidator } = require("../../middlewares/index");

router.post("/signup", authRequestValidator, createUser);
router.post("/signin", authRequestValidator, signIn);
router.get("/status", loginStatus);
router.get("/logout", logout);

module.exports = router;
