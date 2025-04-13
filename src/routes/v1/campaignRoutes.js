const express = require("express");
const { authenticateUser } = require("../../middlewares/index");
const { createCampaign } = require("../../controllers/campaign-controller");
const router = express.Router();

router.post("/", authenticateUser, createCampaign);

module.exports = router;
