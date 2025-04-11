const mongoose = require("mongoose");

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    campaignID: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    reviewerName: {
      type: String,
      required: true,
    },
    reviewerEmail: {
      type: String,
    },
    videoLink: { type: String, unique: true, unique: true },
    imageLink: [{ type: String, unique: true }],
    reviewText: { type: String, require: true },
    rating: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
