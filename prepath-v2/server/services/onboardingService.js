const User = require('../models/User');

async function saveOnboardingDetails(userId, details) {
  try {
    await User.findByIdAndUpdate(userId, { onboardingDetails: details });
  } catch (error) {
    throw new Error('Failed to save onboarding details');
  }
}

module.exports = { saveOnboardingDetails };