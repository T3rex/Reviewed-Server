const { dashboardService } = require("../services/service-container");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await dashboardService.getDashboardData(userId);
    return res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};
