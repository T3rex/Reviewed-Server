const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const campaignRoutes = require("./campaignRoutes");
const submissionRoutes = require("./submissionRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/campaign", campaignRoutes);
router.use("/submit", submissionRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
