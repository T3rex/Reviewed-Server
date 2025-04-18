const { userService } = require("../services/service-container");

async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function getUserById(req, res) {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this user",
      });
    }
    const user = await userService.getUserById(req.params.id);
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this user",
      });
    }
    const user = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json({
      message: "User updated successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function deleteUser(req, res) {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this user",
      });
    }
    const user = await userService.deleteUser(req.params.id);
    return res.status(200).json({
      message: "User deleted successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function signIn(req, res) {
  try {
    const data = await userService.signIn(req.body.email, req.body.password);
    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  signIn,
};
