const { reviewService } = require("../services/service-container");

async function submitReview(req, res) {
  try {
    req.body.campaignName = req.params.campaignName;
    req.body.campaignId = req.params.campaignId;
    const response = await reviewService.createReview(req.body);

    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
}

async function deleteReview(req, res) {
  try {
    req.body.userId = req.user.id;
    const response = await reviewService.deleteReview(
      req.params.reviewId,
      req.body.userId
    );
    return res.status(200).json({
      success: true,
      data: response,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
}

async function getAllReviewsByCampaignId(req, res) {
  try {
    const campaignId = req.params.id;
    if (!campaignId) {
      return res.status(400).json({
        success: false,
        error: "Campaign ID is required",
      });
    }
    const response = await reviewService.getAllReviewsByCampaignId(campaignId);
    return res.status(200).json({
      success: true,
      data: response,
      message: "Reviews fetched successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  submitReview,
  getAllReviewsByCampaignId,
  deleteReview,
};
