const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, // Added email field
  password: { type: String, required: true },
  onboardingDetails: {
    examDate: String,
    selectedSubjects: [String],
    studyHours: String,
  },
  studyPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudyPlan' }],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);