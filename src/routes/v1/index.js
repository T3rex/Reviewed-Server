const express = require("express");
const {
  getUserById,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  signIn,
} = require("../../controllers/user-controller");
const { authRequestValidator } = require("../../middlewares/index");

const router = express.Router();

//USER ROUTES
router.get("/user/:id", getUserById);
router.get("/user", getAllUsers);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);

//AUTH ROUTES
router.post("/auth/signup", authRequestValidator, createUser);
router.post("/auth/signin", authRequestValidator, signIn);

module.exports = router;
