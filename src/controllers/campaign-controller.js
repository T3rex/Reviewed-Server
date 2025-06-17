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

async function createDuplicateCampaign(req, res) {
  try {
    const { campaignId, campaignName } = req.body;
    console.log(
      "Creating duplicate campaign with ID:",
      campaignId,
      campaignName
    );
    const duplicateCampaign = await campaignService.createDuplicateCampaign(
      campaignId,
      campaignName
    );
    if (!duplicateCampaign) {
      return res.status(400).json({
        success: false,
        error: "Duplicate Campaign not created",
      });
    }
    return res.status(201).json({
      success: true,
      data: duplicateCampaign,
      submissionLink: duplicateCampaign.submissionLink,
      message: "Duplicate Campaign created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Failed to create duplicate campaign: " + error.message,
    });
  }
}
async function getCampaignById(req, res) {
  try {
    const { campaignId } = req.params;
    const campaign = await campaignService.getCampaignById(campaignId);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: "Campaign not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: campaign,
      message: "Campaign retrieved successfully",
    });
  } catch (error) {}
}
async function updateCampaign(req, res) {
  try {
    const { campaignId } = req.params;
    const data = req.body;
    const updatedCampaign = await campaignService.updateCampaign(
      campaignId,
      data
    );
    if (!updatedCampaign) {
      return res.status(404).json({
        success: false,
        error: "Campaign not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedCampaign,
      submissionLink: updatedCampaign.submissionLink,
      message: "Campaign updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Failed to update campaign: " + error.message,
    });
  }
}

async function checkCampaignNameAvailable(req, res) {
  try {
    const { campaignName } = req.body;
    const userId = req.user.id;
    const campaignId = await campaignService.checkCampaignNameAvailable(
      campaignName,
      userId
    );
    return res.status(200).json({
      success: true,
      campaignId: campaignId || null,
      message: campaignId
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
    const { campaignId } = req.params;
    const submissionLink = await campaignService.getCampaignSubmissionLink(
      campaignId
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
    const userId = req.user.id;
    const campaignId = req.params.campaignId;
    const response = await campaignService.deleteCampaign(campaignId, userId);
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
  getCampaignById,
  updateCampaign,
  createDuplicateCampaign,
};
