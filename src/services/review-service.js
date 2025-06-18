const mongoose = require("mongoose");
const { NotFoundError, ForbiddenError } = require("../../utils/errors");

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
      const review = await this.createReviewTransaction(data);
      return review;
    } catch (error) {
      throw new Error(
        "Something went wrong in service layer: " + error.message
      );
    }
  }

  async getAllReviewsByCampaignId(campaignId, session) {
    try {
      const reviews = await this.reviewRepository.getAllReviewsByCampaignId(
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

  async deleteReview(id, userId, session) {
    try {
      await this.deleteReviewTransaction(id, userId);
      return "Review deleted successfully";
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

  async countReviewByUserId(userId) {
    try {
      const data = await this.reviewRepository.countReviewByUserId(userId);
      return data;
    } catch (error) {
      throw new Error(
        "Something went wrong in service layer: " + error.message
      );
    }
  }

  async createReviewTransaction(data) {
    const session = await mongoose.startSession();
    try {
      const result = await session.withTransaction(async () => {
        const review = await this.reviewRepository.createReview(data, session);
        if (!review) {
          throw new Error("Review not created");
        }

        const campaignName = data.campaignName;
        const userId = data.user.id;
        const campaign = await this.campaignService.getCampaignByUserByName(
          campaignName,
          userId,
          session
        );
        if (!campaign) {
          throw new Error("Campaign not found");
        }

        let reviewList = campaign.reviewList;
        reviewList.push(review._id);

        await this.campaignService.updateCampaign(
          campaign.id,
          { reviewList },
          session
        );

        return review;
      });

      return result;
    } catch (error) {
      throw new Error("Transaction failed: " + error.message);
    } finally {
      session.endSession();
    }
  }

  async deleteReviewTransaction(id, userId) {
    const session = await mongoose.startSession();
    try {
      const review = await this.reviewRepository.getReviewById(id, session);
      if (!review) {
        throw new NotFoundError("Review not found");
      }
      if (review.userId.toString() !== userId) {
        throw new ForbiddenError("Unauthorized to delete this review");
      }
      const campaignId = review.campaignId;
      const campaign = await this.campaignService.getCampaignById(
        campaignId,
        session
      );
      if (!campaign) {
        throw new NotFoundError("Campaign not found");
      }
      let reviewList = campaign.reviewList;
      reviewList = reviewList.filter((reviewId) => reviewId.toString() !== id);
      await this.campaignService.updateCampaign(
        campaignId,
        { reviewList },
        session
      );
      await this.reviewRepository.deleteReview(id, session);
    } catch (error) {
      throw new Error("Transaction failed: " + error.message);
    } finally {
      session.endSession();
    }
  }

  async handleClientReviewSubmission(data) {
    try {
      const campaign = await this.campaignService.getCampaignById(
        data.campaignId
      );
      if (!campaign) {
        throw new NotFoundError("Campaign not found");
      }
      const review = await this.reviewRepository.createReview(data);
      if (!review) {
        throw new Error("Review not created");
      }
      return review;
    } catch (error) {
      throw new Error(
        "Something went wrong in Service layer: " + error.message
      );
    }
  }
}

module.exports = ReviewService;
