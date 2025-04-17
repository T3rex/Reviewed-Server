const { Campaign } = require("../models/index");

class CampaignRepository {
  constructor() {
    this.Campaign = Campaign;
  }

  async createCampaign(data, session) {
    try {
      const campaign = await this.Campaign.create([data], { session });
      return campaign[0];
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
}

module.exports = CampaignRepository;
