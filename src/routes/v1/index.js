const express = require("express");
const router = express.Router();

router.get("/info", (req, res) => {
  return res.json({ success: true });
});

module.exports = router;
