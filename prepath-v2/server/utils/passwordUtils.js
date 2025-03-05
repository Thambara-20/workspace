const bcrypt = require('bcrypt');

/**
 * Generates a bcrypt hash for a given password.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
async function generatePasswordHash(password) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        console.log(`Generated password hash: ${hash}`);
        return hash;
    } catch (error) {
        console.error('Error generating password hash:', error);
        throw error;
    }
}

/**
 * Validates a plain text password against a hashed password.
 * @param {string} plainPassword - The plain text password to validate.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - True if the password is valid, false otherwise.
 */
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
    generatePasswordHash,
    validatePassword
};