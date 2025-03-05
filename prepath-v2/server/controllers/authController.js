const bcrypt = require('bcrypt');
const UserService = require('../services/UserService');
const User = require('../models/User');

async function generatePasswordHash(password) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
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

class AuthController {
    static async register(req, res) {
        const { username, email, password } = req.body;
        try {
            const user = await UserService.create({ username, email, password });
            console.log(`User registered successfully: ${user.email}`);
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            console.error('Error during user registration:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserService.getByEmail(email);
            if (!user) {
                console.error(`Login failed: User not found with email ${email}`);
                return res.status(400).json({ error: 'Email or password is incorrect' });
            }

            const isPasswordValid = await validatePassword(password, user.password);
            if (!isPasswordValid) {
                console.error(`Login failed: Invalid password for email ${email}`);
                return res.status(400).json({ error: 'Email or password is incorrect' });
            }

            console.log(`User logged in successfully: ${email}`);
            res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = AuthController;