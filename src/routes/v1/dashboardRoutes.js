const express = require("express");
const { getDashboardData } = require("../../controllers/dashboard-controller");
const { authenticateUser } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticateUser, getDashboardData);

module.exports = router;
