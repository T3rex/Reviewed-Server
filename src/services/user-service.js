const { UserRepository } = require("../repositories/index");
const { JWT_PRIVATE_KEY } = require("../config/server-config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    try {
      const user = await this.userRepository.create(data);
      if (user) {
        const token = this.createToken({ id: user._id, email: user.email });
        return {
          user,
          token,
        };
      }
      return user;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  async getUserById(id) {
    try {
      const user = await this.userRepository.getUserById(id);
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

  async getUserByEmail(email) {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      return user;
    } catch (error) {
      throw new Error("Error fetching user by email: " + error.message);
    }
  }

  async signIn(email, password) {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = this.checkPassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      const token = this.createToken({ id: user._id, email: user.email });
      return {
        user: { id: user._id, email: user.email },
        token,
      };
    } catch (error) {
      throw new Error("Error signing in: " + error.message);
    }
  }

  createToken(user) {
    try {
      const token = jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: "1h" });
      return token;
    } catch (error) {
      throw new Error("Error creating token: " + error.message);
    }
  }

  verifyToken(token) {
    try {
      const user = jwt.verify(token, JWT_PRIVATE_KEY);
      return user;
    } catch (error) {
      throw new Error("Error verifying token: " + error.message);
    }
  }

  checkPassword(userPassword, dbPassword) {
    try {
      return bcrypt.compareSync(userPassword, dbPassword);
    } catch (error) {
      throw new Error("Error checking password: " + error.message);
    }
  }
}

module.exports = UserService;
