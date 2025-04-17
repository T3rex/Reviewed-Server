const { campaignService } = require("../services/service-container");

async function createCampaign(req, res) {
  try {
    req.body.userId = req.user.id;
    const response = await campaignService.createCampaign(req.body);
    return res.status(201).json({
      success: true,
      data: response,
      message: "Campaign created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Failed to create campaign: " + error.message,
    });
  }
}

async function deleteCampaign(req, res) {
  try {
    const campaign = await campaignService.getCampaignById(req.params.id);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: "Campaign does not exist",
      });
    }
    if (req.user.id !== campaign.userId.toString()) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to delete this campaign",
      });
    }

    try {
      const response = await campaignService.deleteCampaign(req.params.id);
      return res.status(200).json({
        success: true,
        data: response,
        message: "Campaign deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: "Failed to delete campaign: " + error.message,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  createCampaign,
  deleteCampaign,
};
