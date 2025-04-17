const express = require("express");
const { authenticateUser } = require("../../middlewares/index");
const {
  createCampaign,
  deleteCampaign,
} = require("../../controllers/campaign-controller");
const {
  createReview,
  deleteReview,
} = require("../../controllers/review-controller");
const router = express.Router();

router.post("/", authenticateUser, createCampaign);
router.delete("/:id", authenticateUser, deleteCampaign);
router.post("/:id/review", authenticateUser, createReview);
router.delete("/:id/review/:reviewId", authenticateUser, deleteReview);
module.exports = router;
