const express = require("express");
const router = express.Router();
const {
  createUser,
  signIn,
  loginStatus,
  signout,
} = require("../../controllers/user-controller");
const { authRequestValidator } = require("../../middlewares/index");

router.post("/signup", authRequestValidator, createUser);
router.post("/signin", authRequestValidator, signIn);
router.get("/status", loginStatus);
router.get("/signout", signout);

module.exports = router;
