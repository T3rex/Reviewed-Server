const mongoose = require("mongoose");
const { Review } = require("../models/index");

class ReviewRepository {
  constructor() {
    this.review = Review;
  }

  async createReview(data, session) {
    try {
      const review = await this.review.create([data], { session });
      return review[0];
    } catch (error) {
      throw new Error(
        "Something went wrong in Review Repository: " + error.message
      );
    }
  }

  async getAllReviewsByCampaignId(campaignId, page = 0, limit = 10, session) {
    try {
      const total = await this.review.countDocuments({ campaignId });
      const hasMore = total > (page + 1) * limit;
      const reviews = await this.review
        .find({ campaignId })
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit)
        .session(session);

      return { reviews, hasMore };
    } catch (error) {
      throw new Error(
        "Something went wrong in Review Repository: " + error.message
      );
    }
  }

  async deleteAllReviewsByCampaignId(campaignId, session) {
    try {
      const result = await this.review
        .deleteMany({ campaignId })
        .session(session);
    } catch (error) {
      throw new Error(
        "Something went wrong in Review Repository: " + error.message
      );
    }
  }

  async deleteReview(id, session) {
    try {
      const review = await this.review.findByIdAndDelete(id).session(session);
      return review;
    } catch (error) {
      throw new Error(
        "Something went wrong in Review Repository: " + error.message
      );
    }
  }

  async getReviewById(id, session) {
    try {
      const review = await this.review.findById(id).session(session);
      return review;
    } catch (error) {
      throw new Error(
        "Something went wrong in Review Repository: " + error.message
      );
    }
  }

  async getReviewStatsByUserId(userId, session) {
    try {
      const stats = await this.review.aggregate([
        {
          $facet: {
            totalReviews: [
              {
                $match: {
                  campaignOwner: new mongoose.Types.ObjectId(`${userId}`),
                },
              },
              { $count: "totalReviews" },
            ],
            averageRating: [
              {
                $match: {
                  campaignOwner: new mongoose.Types.ObjectId(`${userId}`),
                },
              },
              {
                $group: {
                  _id: null,
                  averageRating: { $avg: "$rating" },
                },
              },
            ],
            recentReviews: [
              {
                $match: {
                  campaignOwner: new mongoose.Types.ObjectId(`${userId}`),
                },
              },
              { $sort: { createdAt: -1 } },
              { $limit: 5 },
              {
                $project: {
                  id: 1,
                  imageLink: 1,
                  rating: 1,
                  reviewText: 1,
                  reviewerName: 1,
                  videoLink: 1,
                },
              },
            ],
          },
        },
      ]);
      return stats[0];
    } catch (error) {
      throw new Error(
        "Something went wrong in Review Repository: " + error.message
      );
    }
  }
}

module.exports = ReviewRepository;
