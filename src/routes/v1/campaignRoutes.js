const express = require("express");
const { authenticateUser } = require("../../middlewares/index");
const {
  createCampaign,
  deleteCampaign,
  checkCampaignNameAvailable,
  getCampaignSubmissionLink,
  getCampaignById,
  updateCampaign,
} = require("../../controllers/campaign-controller");
const {
  deleteReview,
  getAllReviewsByCampaignId,
} = require("../../controllers/review-controller");
const router = express.Router();

router.get("/:campaignId", authenticateUser, getCampaignById);
router.post("/", authenticateUser, createCampaign);
router.put("/:campaignId", authenticateUser, updateCampaign); // Reusing createCampaign for update
router.delete("/:campaignId", authenticateUser, deleteCampaign);
router.delete("/:campaignId/:reviewId", authenticateUser, deleteReview);
router.get("/:campaignId/review", authenticateUser, getAllReviewsByCampaignId);
router.post(
  "/check-availability",
  authenticateUser,
  checkCampaignNameAvailable
);
router.get(
  "/submission-link/:campaignId",
  authenticateUser,
  getCampaignSubmissionLink
);

module.exports = router;
