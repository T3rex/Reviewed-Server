const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const campaignRoutes = require("./campaignRoutes");
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/campaign", campaignRoutes);

module.exports = router;
