class DashboardService {
  constructor({ campaignService, reviewService, userService }) {
    this.campaignService = campaignService;
    this.reviewService = reviewService;
    this.userService = userService;
  }

  async getDashboardData(userId) {
    try {
      const totalReviews = await this.reviewService.countReviewByUserId(userId);
      return totalReviews;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw new Error("Failed to fetch dashboard data");
    }
  }
}

module.exports = DashboardService;
