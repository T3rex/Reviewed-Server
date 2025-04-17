const express = require("express");
const { authenticateUser } = require("../../middlewares/index");
const {
  createCampaign,
  deleteCampaign,
} = require("../../controllers/campaign-controller");
const router = express.Router();

router.post("/", authenticateUser, createCampaign);
router.delete("/:id", authenticateUser, deleteCampaign);

module.exports = router;
