class DashboardService {
  constructor({ campaignService, reviewService, userService }) {
    this.campaignService = campaignService;
    this.reviewService = reviewService;
    this.userService = userService;
  }

  async getDashboardData(userId) {
    try {
      console.log("Fetching dashboard data for user ID:", userId);
      return "Dashboard data fetched successfully";
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw new Error("Failed to fetch dashboard data");
    }
  }
}

module.exports = DashboardService;
