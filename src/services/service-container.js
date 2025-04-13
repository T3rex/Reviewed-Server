const {
  CampaignRepository,
  ReviewRepository,
  UserRepository,
} = require("../repositories/index");

// Services
const CampaignService = require("./campaign-service");
const ReviewService = require("./review-service");
const UserService = require("./user-service");

// Instantiate repositories
const campaignRepository = new CampaignRepository();
const reviewRepository = new ReviewRepository();
const userRepository = new UserRepository();

// Instantiate UserService (no dependencies)
const userService = new UserService(userRepository);

// Declare variables for services
let campaignService;
let reviewService;

// Instantiate ReviewService first, inject campaignService as a function (lazy)
reviewService = new ReviewService({
  reviewRepository,
  campaignService: () => campaignService, // lazy inject
});

// Instantiate CampaignService with everything
campaignService = new CampaignService({
  campaignRepository,
  reviewService,
  userService,
});

reviewService.campaignService = campaignService;

module.exports = {
  campaignService,
  reviewService,
  userService,
};
