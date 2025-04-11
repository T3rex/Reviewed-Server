const express = require("express");
const {
  getUser,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../../controllers/user-controller");
const router = express.Router();

router.post("/user", createUser);
router.get("/user/:id", getUser);
router.get("/user", getAllUsers);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);

module.exports = router;
