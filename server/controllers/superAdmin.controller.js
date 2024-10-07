// controllers/superAdmin.controller.js
import SuperAdmin from '../models/superAdmin.model.js';
import jwt from 'jsonwebtoken';

// JWT Secret from your .env file
const JWT_SECRET = process.env.JWT_SECRET;

// Signup controller
export const signupSuperAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const superAdminExists = await SuperAdmin.findOne({ email });
    if (superAdminExists) {
      return res.status(400).json({ message: 'Super Admin already exists' });
    }

    const superAdmin = new SuperAdmin({ email, password });
    await superAdmin.save();

    res.status(201).json({ message: 'Super Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginSuperAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find Super Admin by email
    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await superAdmin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: superAdmin._id }, process.env.JWT_SECRET, { expiresIn: '24h' });


    res.status(200).json({ token, role: 'superadmin' });
  } catch (error) {
    console.error("Login Error:", error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

