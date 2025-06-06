const { User } = require("../models/index");

class UserRepository {
  constructor() {
    this.User = User;
  }

  async create(data, session) {
    try {
      const user = await this.User.create([data], { session }); // use array form with session
      return user[0];
    } catch (error) {
      if (error.code === 11000) {
        throw error;
      }
      console.error("Error in repository create():", error);
      throw new Error("Error creating user: " + error.message);
    }
  }

  async getUserById(id, session) {
    try {
      const user = await this.User.findById(id)
        .select("-password")
        .session(session);
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  async update(id, data, session) {
    try {
      const user = await this.User.findByIdAndUpdate(id, data, {
        new: true,
        session,
      }).select("-password");
      return user;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async delete(id, session) {
    try {
      const user = await this.User.findByIdAndDelete(id).session(session);
      return user;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  async getAll(session) {
    try {
      const users = await this.User.find().select("-password").session(session);
      return users;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }

  async getUserByEmail(email, session) {
    try {
      const user = await this.User.findOne({ email })
        .select("-campaignList")
        .session(session);
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
