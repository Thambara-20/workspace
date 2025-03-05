const { randomUUID } = require("crypto");

const User = require("../models/User.js");
const {
  generatePasswordHash,
  validatePassword,
} = require("../utils/password.js");

class UserService {
  static async list() {
    try {
      return User.find();
    } catch (err) {
      console.error("Error listing users:", err);
      throw new Error(`Database error while listing users: ${err}`);
    }
  }

  static async get(id) {
    try {
      return User.findOne({ _id: id }).exec();
    } catch (err) {
      console.error(`Error getting user by ID ${id}:`, err);
      throw new Error(
        `Database error while getting the user by their ID: ${err}`
      );
    }
  }

  static async getByEmail(email) {
    try {
      return User.findOne({ email }).exec();
    } catch (err) {
      console.error(`Error getting user by email ${email}:`, err);
      throw new Error(
        `Database error while getting the user by their email: ${err}`
      );
    }
  }

  static async update(id, data) {
    try {
      return User.findOneAndUpdate({ _id: id }, data, {
        new: true,
        upsert: false,
      });
    } catch (err) {
      console.error(`Error updating user ${id}:`, err);
      throw new Error(`Database error while updating user ${id}: ${err}`);
    }
  }

  static async delete(id) {
    try {
      const result = await User.deleteOne({ _id: id }).exec();
      return result.deletedCount === 1;
    } catch (err) {
      console.error(`Error deleting user ${id}:`, err);
      throw new Error(`Database error while deleting user ${id}: ${err}`);
    }
  }

  static async authenticateWithPassword(email, password) {
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    try {
      const user = await User.findOne({ email }).exec();
      if (!user) {
        console.error(`User with email ${email} not found`);
        return null;
      }

      const passwordValid = await validatePassword(password, user.password);
      if (!passwordValid) {
        console.error(`Password validation failed for user with email ${email}`);
        return null;
      }

      user.lastLoginAt = Date.now();
      const updatedUser = await user.save();
      return updatedUser;
    } catch (err) {
      console.error(`Error authenticating user ${email} with password:`, err);
      throw new Error(
        `Database error while authenticating user ${email} with password: ${err}`
      );
    }
  }

  static async create({ username, email, password }) {
    if (!username) throw new Error("Username is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    const existingUser = await UserService.getByEmail(email);
    if (existingUser) throw new Error("User with this email already exists");

    const hash = await generatePasswordHash(password);

    try {
      const user = new User({
        username,
        email,
        password: hash,
      });

      await user.save();
      return user;
    } catch (err) {
      console.error("Error creating new user:", err);
      throw new Error(`Database error while creating new user: ${err}`);
    }
  }

  static async setPassword(user, password) {
    if (!password) throw new Error("Password is required");
    user.password = await generatePasswordHash(password); // eslint-disable-line

    try {
      if (!user.isNew) {
        await user.save();
      }

      return user;
    } catch (err) {
      console.error("Error setting user password:", err);
      throw new Error(`Database error while setting user password: ${err}`);
    }
  }
}

module.exports = UserService;