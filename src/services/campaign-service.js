const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const { CampaignRepository } = require("../repositories/index");
const UserService = require("./user-service");
const ReviewService = require("./review-service");

class CampaignService {
  constructor() {
    this.campaignRepository = new CampaignRepository();
    this.reviewService = new ReviewService();
    this.userService = new UserService();
  }

  async createCampaign(data) {
    try {
      data.submissionLink = uuidv4();
      const campaign = await this.campaignRepository.createCampaign(data);
      return campaign;
    } catch (error) {
      throw new Error(
        "Something went wrong in Service layer: " + error.message
      );
    }
  }
  async getCampaignById(id) {
    try {
      const campaign = await this.campaignRepository.getCampaignById(id);
      if (!campaign) {
        throw new Error("Campaign not found");
      }
      return campaign;
    } catch (error) {
      throw new Error(
        "Something went wrong in Service layer: " + error.message
      );
    }
  }

  async getAllCampaignByUserId(userId) {
    try {
      const campaigns = await this.campaignRepository.getAllCampaignByUserId(
        userId
      );
      return campaigns;
    } catch (error) {
      throw new Error(
        "Something went wrong in Service layer: " + error.message
      );
    }
  }

  async updateCampaign(id, data) {
    try {
      const campaign = await this.campaignRepository.updateCampaign(id, data);
      if (!campaign) {
        throw new Error("Campaign not found");
      }
      return campaign;
    } catch (error) {
      throw new Error(
        "Something went wrong in Service layer: " + error.message
      );
    }
  }

  async deleteCampaign(id) {
    try {
      await deleteCampaignTransation(id);
      return "Campaign deleted successfully";
    } catch (error) {
      throw new Error(
        "Something went wrong in Service layer: " + error.message
      );
    }
  }

  async deleteCampaignTransation(id) {
    try {
      const session = await mongoose.startSession();
      await session.withTransaction(async () => {
        const campaign = await this.campaignRepository.getCampaignById(
          id,
          session
        );
        if (!campaign) {
          throw new Error("Campaign not found");
        }

        await this.reviewService.deleteAllReviewsByCampaignId(id, session);
        const user = await this.userService.getUserById(
          campaign.userId,
          session
        );
        if (!user) {
          throw new Error("User not found");
        }
        let campaignList = user.campaignList;
        campaignList = campaignList.filter(
          (campId) => campId.toString() !== id
        );
        await this.userService.updateUser(user.id, { campaignList }, session);
        await this.campaignRepository.deleteCampaign(id, session);
      });
    } catch (error) {
      console.error("Transaction failed:", error);
      throw new Error("Transaction failed: " + error.message);
    } finally {
      session.endSession();
    }
  }
}

module.exports = CampaignService;
