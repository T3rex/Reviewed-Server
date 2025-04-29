const express = require("express");
const router = express.Router();
const { submitReview } = require("../../controllers/review-controller");

router.post("/:campaignId", submitReview);

module.exports = router;
