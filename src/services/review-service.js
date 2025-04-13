class ReviewService {
  constructor({ reviewRepository, campaignService }) {
    this.reviewRepository = reviewRepository;
    this._getCampaignService = campaignService; // use function if lazy inject
  }

  get campaignService() {
    return typeof this._getCampaignService === "function"
      ? this._getCampaignService()
      : this._getCampaignService;
  }

  setCampaignService(service) {
    this.campaignService = service;
  }

  async createReview(data, session) {
    try {
      const review = await this.reviewRepository.createReview(data, session);
      if (!review) {
        throw new Error("Review not created");
      }
      const campaignId = data.campaignId;
      const campaign = await this.campaignService.getCampaignById(campaignId);
      if (!campaign) {
        throw new Error("Campaign not found");
      }
      let reviewList = campaign.reviewList;
      reviewList.push(review.id);
      await this.campaignService.updateCampaign(campaignId, { reviewList });
      return review;
    } catch (error) {
      throw new Error(
        "Something went wrong in service layer: " + error.message
      );
    }
  }

  async getAllReviews(campaignId, session) {
    try {
      const reviews = await this.reviewRepository.getAllReviews(
        campaignId,
        session
      );
      return reviews;
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
