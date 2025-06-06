const mongoose = require("mongoose");

const { Schema } = mongoose;

const campaignSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    campaignName: {
      type: String,
      required: true,
    },

    collectStars: {
      type: Boolean,
      required: true,
    },
    collectionType: {
      type: String,
      enum: ["Text only", "Video only", "Text and Video"],
      default: "Text Only",
    },
    customMessage: {
      type: String,
    },
    questions: [
      {
        type: String,
      },
    ],
    extraInfo: {
      email: {
        enabled: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
      },
      name: {
        enabled: { type: Boolean, default: true },
        required: { type: Boolean, default: true },
      },
      title: {
        enabled: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
      },
      socialLink: {
        enabled: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
      },
    },
    headerTitle: {
      type: String,
      required: true,
    },
    campaignLogo: {
      type: String,
      default: "https://i.pravatar.cc/40",
    },
    thankImageUrl: {
      type: String,
      default:
        "https://media1.giphy.com/media/g9582DNuQppxC/giphy.gif?cid=ecf05e47ibtkj6mhht2m6gpzy157hwtxvlxlzqlijwrfqh8i&rid=giphy.gif",
    },
    thankTitle: {
      type: String,
      default: "Thank you!",
    },
    thankMessage: {
      type: String,
      default: "Thank you so much for your shoutout! It means a ton for us! 🙏",
    },
    redirectUrl: {
      type: String,
      default: "",
    },
    allowSMShare: {
      type: Boolean,
      default: false,
    },
    submissionLink: { type: String, unique: true, required: true },
    reviewList: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
