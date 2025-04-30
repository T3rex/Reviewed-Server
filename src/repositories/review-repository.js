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

  async getAllReviewsByCampaignId(campaignId, session) {
    try {
      const reviews = await this.review.find({ campaignId }).session(session);
      return reviews;
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

  async countReviewByUserId(userId, session) {
    try {
      const stats = await this.review.aggregate([
        {
          $facet: {
            totalReviews: [
              {
                $match: {
                  userId: new mongoose.Types.ObjectId(`${userId}`),
                },
              },
              { $count: "totalReviews" },
            ],
            averageRating: [
              {
                $match: { userId: new mongoose.Types.ObjectId(`${userId}`) },
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
                $match: { userId: new mongoose.Types.ObjectId(`${userId}`) },
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
