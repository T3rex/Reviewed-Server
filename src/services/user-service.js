const { UserRepository } = require("../repositories/index");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  async getUser(id) {
    try {
      const user = await this.userRepository.get(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.getAll();
      return users;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }

  async updateUser(id, data) {
    try {
      const user = await this.userRepository.update(id, data);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.userRepository.delete(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

module.exports = UserService;
