const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming User is a Mongoose model

class UserService {
    static async create({ username, email, password }) {
        if (!username) throw new Error("Username is required");
        if (!email) throw new Error("Email is required");
        if (!password) throw new Error("Password is required");

        const existingUser = await UserService.getByEmail(email);
        if (existingUser) throw new Error("User with this email already exists");

        const hash = await generatePasswordHash(password);
        console.log(`Password hash for ${email}: ${hash}`); // Log the password hash

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

    static async getByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (err) {
            console.error("Error fetching user by email:", err);
            throw new Error(`Database error while fetching user by email: ${err}`);
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
}

async function generatePasswordHash(password) {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.error('Error generating password hash:', error);
        throw error;
    }
}

async function validatePassword(plainPassword, hashedPassword) {
    try {
        const isValid = await bcrypt.compare(plainPassword, hashedPassword);
        if (!isValid) {
            console.error(`Password validation failed: plainPassword=${plainPassword}, hashedPassword=${hashedPassword}`);
        }
        return isValid;
    } catch (error) {
        console.error('Error during password validation:', error);
        throw error;
    }
}

module.exports = {
    UserService,
    validatePassword
};