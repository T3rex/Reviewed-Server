const { campaignService } = require("../services/service-container");

async function createCampaign(req, res) {
  try {
    req.body.userId = req.user.id;
    const response = await campaignService.createCampaign(req.body);
    return res.status(201).json({
      success: true,
      data: response,
      submissionLink: response.submissionLink,
      message: "Campaign created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Failed to create campaign: " + error.message,
    });
  }
}
async function checkCampaignNameAvailable(req, res) {
  try {
    const { campaignName } = req.body;
    const userId = req.user.id;
    const isAvailable = await campaignService.checkCampaignNameAvailable(
      campaignName,
      userId
    );
    return res.status(200).json({
      success: true,
      isAvailable: isAvailable,
      message: isAvailable
        ? "Campaign name is available"
        : "Campaign name is already taken",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Failed to check campaign name availability: " + error.message,
    });
  }
}
async function getCampaignSubmissionLink(req, res) {
  try {
    const { campaignName } = req.body;
    const userId = req.user.id;
    const submissionLink = await campaignService.getCampaignSubmissionLink(
      userId,
      campaignName
    );
    if (!submissionLink) {
      return res.status(404).json({
        success: false,
        error: "Campaign submission link not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: submissionLink,
      message: "Campaign submission link retrieved successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Failed to get campaign submission link: " + error.message,
    });
  }
}
async function deleteCampaign(req, res) {
  try {
    const response = await campaignService.deleteCampaign(
      req.params.campaignId
    );
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
}

module.exports = {
  createCampaign,
  deleteCampaign,
  checkCampaignNameAvailable,
  getCampaignSubmissionLink,
};
