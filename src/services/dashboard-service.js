class DashboardService {
  constructor({ campaignService, reviewService, userService }) {
    this.campaignService = campaignService;
    this.reviewService = reviewService;
    this.userService = userService;
  }

  async getDashboardData(userId) {
    try {
      const reviewStats = await this.reviewService.getReviewStatsByUserId(
        userId
      );
      const campaignStats = await this.campaignService.getCampaignStatsByUserId(
        userId
      );
      return {
        totalReviews: reviewStats?.totalReviews[0]?.totalReviews,
        averageRating: reviewStats?.averageRating[0]?.averageRating,
        recentReviews: reviewStats?.recentReviews,
        totalCampaigns: campaignStats?.totalCampaigns[0]?.totalCampaigns,
        activeCampaigns: campaignStats?.activeCampaigns[0]?.activeCampaigns,
        recentCampaigns: campaignStats?.recentCampaigns,
      };
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw new Error("Failed to fetch dashboard data");
    }
  }
}

module.exports = DashboardService;
