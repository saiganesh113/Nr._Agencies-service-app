import express from 'express';
import { createProfile, getProfileByUsername, updateProfileByUsername, deleteProfileByUsername } from '../controllers/profile.controller.js';

const router = express.Router();

// Create a new profile
router.post('/', createProfile);

// Get profile by username
router.get('/:username', getProfileByUsername);

// Update profile by username
router.put('/:username', updateProfileByUsername);

// Delete profile by username
router.delete('/:username', deleteProfileByUsername);

// Check if username exists
router.get('/check-username/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const existingProfile = await Profile.findOne({ username });
    res.status(200).json({ exists: !!existingProfile });
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
