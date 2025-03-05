const express = require('express');
const router = express.Router();
const { saveOnboardingDetails } = require('../services/onboardingService');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// POST /api/onboarding
router.post('/', async (req, res) => {
  try {
    const { examDate, selectedSubjects, studyHours } = req.body;
    await saveOnboardingDetails(req.user._id, { examDate, selectedSubjects, studyHours });
    res.status(200).json({ success: true, message: 'Onboarding details saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/upload-materials
router.post('/upload-materials', upload.array('files'), (req, res) => {
  try {
    // Here you would handle the uploaded files, e.g., save them to the database or file system
    res.status(200).json({ success: true, message: 'Files uploaded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;