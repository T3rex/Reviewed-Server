const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");
const { authenticateUser } = require("../../middlewares/index");

const router = express.Router();

router.get("/", authenticateUser, getAllUsers);
router.get("/:id", authenticateUser, getUserById);
router.put("/:id", authenticateUser, updateUser);
router.delete("/:id", authenticateUser, deleteUser);

module.exports = router;
