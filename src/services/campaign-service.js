const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const { NotFoundError, ForbiddenError } = require("../../utils/errors");

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
      const campaign = await this.createCampaignTransaction(data);
      return campaign;
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

  async getCampaignStatsByUserId(userId, session) {
    try {
      const stats = await this.campaignRepository.getCampaignStatsByUserId(
        userId,
        session
      );
      return stats;
    } catch (error) {
      throw new Error(
        "Something went wrong in Service layer: " + error.message
      );
    }
  }

  async getActiveCampaignsCount(userId, session) {
    try {
      const activeCampaignsCount =
        await this.campaignRepository.getActiveCampaignsCount(userId, session);
      return activeCampaignsCount;
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

  async deleteCampaign(id, userId, session) {
    try {
      await this.deleteCampaignTransaction(id, userId, session);
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
      const result = await session.withTransaction(async () => {
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
        return campaign;
      });
      return result;
    } catch (error) {
      throw new Error("Transaction failed: " + error.message);
    } finally {
      session.endSession();
    }
  }

  async deleteCampaignTransaction(id, userId) {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const campaign = await this.campaignRepository.getCampaignById(
          id,
          session
        );
        if (!campaign) {
          throw new NotFoundError("Campaign not found");
        }
        if (campaign.userId.toString() !== userId) {
          throw new ForbiddenError(
            "You are not authorized to delete this campaign"
          );
        }
        await this.reviewService.deleteAllReviewsByCampaignId(id, session);
        const user = await this.userService.getUserById(
          campaign.userId,
          session
        );
        if (!user) {
          throw new NotFoundError("User not found");
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
