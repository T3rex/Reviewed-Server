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

  async get(id) {
    try {
      const user = await this.User.findById(id);
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  async update(id, data) {
    try {
      const user = await this.User.findByIdAndUpdate(id, data);
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
      const users = await this.User.find();
      return users;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }
}

module.exports = UserRepository;
