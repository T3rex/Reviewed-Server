const { reviewService } = require("../services/service-container");

async function createReview(req, res) {
  try {
    req.body.campaignId = req.params.id;
    req.body.userId = req.user.id;
    const response = await reviewService.createReview(req.body);
    return res.status(201).json({
      success: true,
      data: response,
      message: "Review created successfully",
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

async function getAllReviews(req, res) {
  try {
    const response = await reviewService.getAllReviews(req.params.id);
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
  createReview,
  getAllReviews,
  deleteReview,
};
