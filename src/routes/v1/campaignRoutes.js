const express = require("express");
const { authenticateUser } = require("../../middlewares/index");
const {
  createCampaign,
  deleteCampaign,
} = require("../../controllers/campaign-controller");
const {
  deleteReview,
  getAllReviewsByCampaignId,
} = require("../../controllers/review-controller");
const router = express.Router();

router.post("/", authenticateUser, createCampaign);
router.delete("/:campaignId", authenticateUser, deleteCampaign);
router.delete("/:campaignId/:reviewId", authenticateUser, deleteReview);
router.get("/:campaignId/review", authenticateUser, getAllReviewsByCampaignId);

module.exports = router;
