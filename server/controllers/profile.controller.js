import Profile from '../models/profile.model.js';

// Create a new profile
export const createProfile = async (req, res) => {
  try {
    const { username, firstName, lastName, mobileNumber, email, dateOfBirth, address, photo } = req.body;

    // Validate that all fields are provided
    if (!username || !firstName || !lastName || !mobileNumber || !email || !dateOfBirth || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if a profile with the same username or email already exists
    const existingProfile = await Profile.findOne({ $or: [{ username }, { email }] });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists with this username or email' });
    }

    // Create a new profile
    const newProfile = new Profile({
      username,
      firstName,
      lastName,
      mobileNumber,
      email,
      dateOfBirth,
      address,
      photo,
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get profile by username
export const getProfileByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const profile = await Profile.findOne({ username });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update profile by username
export const updateProfileByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const { firstName, lastName, mobileNumber, email, dateOfBirth, address, photo } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { username },
      { firstName, lastName, mobileNumber, email, dateOfBirth, address, photo },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete profile by username
export const deleteProfileByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const profile = await Profile.findOneAndDelete({ username });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
