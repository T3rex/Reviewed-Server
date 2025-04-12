const { User } = require("../models/index");

class UserRepository {
  constructor() {
    this.User = User;
  }

  async create(data) {
    try {
      const user = await this.User.create(data);
      return user;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  async getUserById(id) {
    try {
      const user = await this.User.findById(id).select("-password");
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const user = await this.User.findByIdAndUpdate(id, data).select(
        "-password"
      );
      return user;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async delete(id) {
    try {
      const user = await this.User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  async getAll() {
    try {
      const users = await this.User.find().select("-password");
      return users;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }
}

module.exports = UserRepository;
