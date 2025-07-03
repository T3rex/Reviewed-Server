const mongoose = require("mongoose");

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    campaignOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewerName: {
      type: String,
      required: true,
    },
    reviewerEmail: {
      type: String,
      sparse: true,
    },
    reviewerSocialLink: {
      type: String,
      sparse: true,
    },
    reviewerTitle: { type: String, sparse: true },
    videoLink: { type: String, sparse: true },
    imageLinks: [{ type: String, sparse: true }],
    reviewerPhoto: { type: String, sparse: true },
    reviewText: { type: String, sparse: true },
    rating: { type: Number, required: true },
    isApproved: {
      type: Boolean,
      default: true,
    },
    permission: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
