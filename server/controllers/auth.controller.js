import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Technician from '../models/technician.model.js';
import User from '../models/user.model.js';

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Register Technician
export const registerTechnician = async (req, res) => {
  try {
    const { techid, Name, email, phone, adharnumber, pancard, password } = req.body;

    // Validate input
    if (!techid || !Name || !email || !phone || !adharnumber || !pancard || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if technician already exists
    const existingTechnician = await Technician.findOne({ techid });
    if (existingTechnician) {
      return res.status(400).json({ message: 'Technician with this Tech ID already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new technician
    const technician = new Technician({
      techid,
      Name,
      email,
      phone,
      adharnumber,
      pancard,
      password: hashedPassword,
    });

    await technician.save();

    // Generate JWT token
    const token = generateToken(technician._id);

    // Respond with success message and token
    res.status(201).json({
      message: 'Technician registered successfully',
      token,
      technician: {
        techid: technician.techid,
        Name: technician.Name,
        email: technician.email,
        phone: technician.phone,
        adharnumber: technician.adharnumber,
        pancard: technician.pancard,
      }
    });
  } catch (error) {
    console.error('Error registering technician:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { userid, firstName, lastName, email, phone, dateofbirth, password } = req.body;

    if (!userid || !firstName || !lastName || !email || !phone || !dateofbirth || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ userid });
    if (existingUser) {
      return res.status(400).json({ message: 'User ID already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userid,
      firstName,
      lastName,
      email,
      phone,
      dateofbirth,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Login Technician
export const loginTechnician = async (req, res) => {
  try {
    const { techid, password } = req.body;

    if (!techid || !password) {
      return res.status(400).json({ message: 'Tech ID and password are required' });
    }

    const technician = await Technician.findOne({ techid });
    if (!technician) {
      return res.status(401).json({ message: 'Invalid Tech ID or password' });
    }

    const isMatch = await bcrypt.compare(password, technician.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Tech ID or password' });
    }

    const token = generateToken(technician._id);
    res.status(200).json({ token, techId: technician.techid });
  } catch (error) {
    console.error('Error logging in technician:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { userid, password } = req.body;

    if (!userid || !password) {
      return res.status(400).json({ message: 'User ID and password are required' });
    }

    const user = await User.findOne({ userid });
    if (!user) {
      return res.status(400).json({ message: 'Invalid User ID or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid User ID or password' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get Technician by Tech ID
export const getTechnician = async (req, res) => {
  try {
    const { techid } = req.params;
    const technician = await Technician.findOne({ techid });
    if (!technician) {
      return res.status(404).json({ message: 'Technician not found' });
    }
    res.status(200).json({ technician });
  } catch (error) {
    console.error('Error getting technician:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Update Technician
export const updateTechnician = async (req, res) => {
  try {
    const { techid } = req.params;
    const { Name, email, phone, adharnumber, pancard, password } = req.body;

    const technician = await Technician.findOne({ techid });
    if (!technician) {
      return res.status(404).json({ message: 'Technician not found' });
    }

    if (Name) technician.Name = Name;
    if (email) technician.email = email;
    if (phone) technician.phone = phone;
    if (adharnumber) technician.adharnumber = adharnumber;
    if (pancard) technician.pancard = pancard;
    if (password) {
      technician.password = await bcrypt.hash(password, 10);
    }

    await technician.save();
    res.status(200).json({ message: 'Technician updated successfully', technician });
  } catch (error) {
    console.error('Error updating technician:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get User by User ID
export const getUser = async (req, res) => {
  const userId = req.params.userid;

  try {
    const user = await User.findOne({ userid: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const { firstName, lastName, email, phone, dateofbirth, password } = req.body;

    const user = await User.findOne({ userid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (dateofbirth) user.dateofbirth = dateofbirth;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get All Technicians
export const getAllTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find({});
    res.status(200).json({ technicians });
  } catch (error) {
    console.error('Error getting technicians:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error getting users:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
