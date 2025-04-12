const express = require("express");
const router = express.Router();
const { createUser, signIn } = require("../../controllers/user-controller");
const { authRequestValidator } = require("../../middlewares/index");

router.post("/signup", authRequestValidator, createUser);
router.post("/signin", authRequestValidator, signIn);

module.exports = router;
