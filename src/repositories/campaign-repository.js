const { Campaign } = require("../models/index");
const mongoose = require("mongoose");

class CampaignRepository {
  constructor() {
    this.Campaign = Campaign;
  }

  async createCampaign(data, session) {
    try {
      const campaign = new this.Campaign(data);
      await campaign.save({ session });
      return campaign;
    } catch (error) {
      throw new Error(
        "Something went wrong in repository layer" + error.message
      );
    }
  }
  async getCampaignById(id, session) {
    try {
      const campaign = await this.Campaign.findById(id).session(session);
      return campaign;
    } catch (error) {
      throw new Error(
        "Something went wrong in repository layer" + error.message
      );
    }
  }

  async getCampaignByUserByName(campaignName, userId, session) {
    try {
      const campaign = await this.Campaign.find({
        user: userId,
        campaignName: campaignName,
      }).session(session);
      return campaign;
    } catch (error) {
      throw new Error(
        "Something went wrong in repository layer" + error.message
      );
    }
  }

  async getCampaignStatsByUserId(userId, session) {
    try {
      const stats = await this.Campaign.aggregate([
        {
          $facet: {
            totalCampaigns: [
              { $match: { userId: new mongoose.Types.ObjectId(`${userId}`) } },
              { $count: "totalCampaigns" },
            ],
            activeCampaigns: [
              {
                $match: {
                  userId: new mongoose.Types.ObjectId(`${userId}`),
                  status: "active",
                },
              },
              { $count: "activeCampaigns" },
            ],
            recentCampaigns: [
              { $match: { userId: new mongoose.Types.ObjectId(`${userId}`) } },
              { $sort: { createdAt: -1 } },
              { $limit: 5 },
              {
                $project: {
                  id: 1,
                  campaignName: 1,
                  description: 1,
                  status: 1,
                },
              },
            ],
          },
        },
      ]);
      return stats[0];
    } catch (error) {
      throw new Error(
        "Something went wrong in repository layer" + error.message
      );
    }
  }

  async getAllCampaignByUserId(userId, session) {
    try {
      const campaigns = await this.Campaign.find({ userId }).session(session);
      return campaigns;
    } catch (error) {
      throw new Error(
        "Something went wrong in repository layer" + error.message
      );
    }
  }

  async;

  async getCampaignSubmissionLink(campaignId, session) {
    try {
      const campaign = await this.Campaign.findOne({ _id: campaignId })
        .select("submissionLink")
        .session(session);

      return campaign?.submissionLink;
    } catch (error) {
      throw new Error(
        "Something went wrong in repository layer: " + error.message
      );
    }
  }

  async updateCampaign(id, data, session) {
    try {
      const campaign = await this.Campaign.findByIdAndUpdate(id, data, {
        new: true,
        session,
      });
      return campaign;
    } catch (error) {
      throw new Error(
        "Something went wrong in repository layer" + error.message
      );
    }
  }
  async deleteCampaign(id, session) {
    try {
      const campaign = await this.Campaign.findById(id).session(session);
      if (!campaign) {
        throw new Error("Campaign not found");
      }
      const updatedCampaign = await this.Campaign.deleteOne(id).session(
        session
      );
      return updatedCampaign;
    } catch (error) {
      throw new Error(
        "Something went wrong in repository layer" + error.message
      );
    }
  }

  async checkCampaignExists(campaignName, userId, session) {
    try {
      const campaign = await this.Campaign.findOne({
        campaignNameLower: campaignName.toLowerCase(),
        userId,
      })
        .select("_id")
        .session(session);
      return campaign;
    } catch (error) {
      throw new Error(
        "Something went wrong in repository layer" + error.message
      );
    }
  }
}

module.exports = CampaignRepository;
