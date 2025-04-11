const { User } = require("../models/index");

class UserRepository {
  constructor() {
    this.User = User;
  }

  async create(data) {
    console.log(data);
    try {
      const user = await this.User.create(data);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async get(id) {
    try {
      const user = await this.User.findById(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, data) {
    try {
      const user = await this.User.findByIdAndUpdate(id, data);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const user = await this.User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const users = await this.User.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserRepository;
