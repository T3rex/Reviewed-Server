const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

class CampaignService {
  constructor({ campaignRepository, reviewService, userService }) {
    this.campaignRepository = campaignRepository;
    this.reviewService = reviewService;
    this.userService = userService;
  }

  setReviewService(service) {
    this.reviewService = service;
  }

  async createCampaign(data, session) {
    try {
      data.submissionLink = uuidv4();
      await this.createCampaignTransaction(data);
      return "Campaign created successfully";
    } catch (error) {
      throw new Error(
        "Something went wrong in Service layer: " + error.message
      );
    }
  }
  async getCampaignById(id, session) {
    try {
      const campaign = await this.campaignRepository.getCampaignById(
        id,
        session
      );
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

  async getAllCampaignByUserId(userId, session) {
    try {
      const campaigns = await this.campaignRepository.getAllCampaignByUserId(
        userId,
        session
      );
      return campaigns;
    } catch (error) {
      throw new Error(
        "Something went wrong in Service layer: " + error.message
      );
    }
  }

  async updateCampaign(id, data, session) {
    try {
      const campaign = await this.campaignRepository.updateCampaign(
        id,
        data,
        session
      );
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

  async deleteCampaign(id, session) {
    try {
      await this.deleteCampaignTransaction(id, session);
      return "Campaign deleted successfully";
    } catch (error) {
      throw new Error(
        "Something went wrong in Service layer: " + error.message
      );
    }
  }

  async createCampaignTransaction(data) {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const campaign = await this.campaignRepository.createCampaign(
          data,
          session
        );
        if (!campaign) {
          throw new Error("Campaign not created");
        }

        const user = await this.userService.getUserById(data.userId, session);
        if (!user) {
          throw new Error("User not found");
        }

        let campaignList = user.campaignList;
        campaignList.push(campaign.id);
        await this.userService.updateUser(user.id, { campaignList }, session);
      });
    } catch (error) {
      throw new Error("Transaction failed: " + error.message);
    } finally {
      session.endSession();
    }
  }

  async deleteCampaignTransaction(id) {
    const session = await mongoose.startSession();
    try {
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
        await this.campaignRepository.deleteCampaign(campaign._id, session);
      });
    } catch (error) {
      throw new Error("Transaction failed: " + error.message);
    } finally {
      session.endSession();
    }
  }
}

module.exports = CampaignService;
