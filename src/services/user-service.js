const { JWT_PRIVATE_KEY } = require("../config/server-config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data, session) {
    try {
      const user = await this.userRepository.create(data, session);
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

  async getUserById(id, session) {
    try {
      const user = await this.userRepository.getUserById(id, session);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  async getAllUsers(session) {
    try {
      const users = await this.userRepository.getAll(session);
      return users;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }

  async updateUser(id, data, session) {
    try {
      const user = await this.userRepository.updateOne(id, data, session);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async deleteUser(id, session) {
    try {
      const user = await this.userRepository.delete(id, session);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  async getUserByEmail(email, session) {
    try {
      const user = await this.userRepository.getUserByEmail(email, session);
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
      const token = this.createToken({ id: user.id, email: user.email });
      return token;
    } catch (error) {
      throw new Error("Error signing in: " + error.message);
    }
  }

  createToken(user) {
    try {
      const token = jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: "1d" });
      return token;
    } catch (error) {
      throw new Error("Error creating token: " + error.message);
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
