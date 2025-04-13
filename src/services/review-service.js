const { ReviewRepository } = require("../repositories/index");

class ReviewService {
  constructor() {
    this.reviewRepository = new ReviewRepository();
  }

  async createReview(data, session) {
    try {
      const review = await this.reviewRepository.createReview(data, session);
      return review;
    } catch (error) {
      throw new Error(
        "Something went wrong in service layer: " + error.message
      );
    }
  }

  async deleteReview(id, session) {
    try {
      const review = await this.reviewRepository.deleteReview(id, session);
      if (!review) {
        throw new Error("Review not found");
      }
      return review;
    } catch (error) {
      throw new Error(
        "Something went wrong in service layer: " + error.message
      );
    }
  }

  async deleteAllReviewsByCampaignId(campaignId, session) {
    try {
      const result = await this.reviewRepository.deleteAllReviewsByCampaignId(
        campaignId,
        session
      );
      return result;
    } catch (error) {
      throw new Error(
        "Something went wrong in service layer: " + error.message
      );
    }
  }
}

module.exports = ReviewService;
