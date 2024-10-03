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
    const { techid, techName, email, phone, adharnumber, password } = req.body;

    // Check if all required fields are provided
    if (!techid || !techName || !email || !phone || !adharnumber || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if a technician with the provided techid or email already exists
    const existingTechnician = await Technician.findOne({ techid });
    const existingEmail = await Technician.findOne({ email });
    
    if (existingTechnician || existingEmail) {
      return res.status(400).json({ message: 'Technician with this Tech ID or Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new technician
    const technician = new Technician({
      techid,
      techName,
      email,
      phone,
      adharnumber,
      password: hashedPassword,
    });

    // Save the new technician to the database
    await technician.save();

    // Generate a JWT token for the technician
    const token = jwt.sign({ techid: technician.techid, role: 'technician' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send a success response with the technician's details and token
    res.status(201).json({
      message: 'Technician registered successfully',
      token,
      technician: {
        techid: technician.techid,
        techName: technician.techName,
        email: technician.email,
        phone: technician.phone,
        adharnumber: technician.adharnumber,
      },
    });
  } catch (error) {
    // Handle any server errors
    console.error('Error registering technician:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Register User
export const registerUser = async (req, res) => {
  const { userid, Name, email, phone, password } = req.body;

  try {
    // Check if all required fields are provided
    if (!userid || !Name || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ userid });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this User ID already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ userid, Name, email, phone, password: hashedPassword });
    
    // Save user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
// Login Technician
export const loginUser = async (req, res) => {
  const { userid, password } = req.body;

  try {
    // Authenticate user and retrieve user data
    const user = await User.findOne({ userid });
    
    // Check if user exists and compare passwords
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a token with user data
    const token = jwt.sign({ userid: user.userid, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token and user data
    res.json({ token, user });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginTechnician = async (req, res) => {
  const { techid, password } = req.body;

  try {
      // Authenticate technician and retrieve technician data
      const technician = await Technician.findOne({ techid });
      if (!technician || !technician.comparePassword(password)) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate a token with technician data
      const token = jwt.sign({ techid: technician.techid, role: 'technician' }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send token and technician ID
      res.json({ token, techId: technician.techid });
  } catch (error) {
      console.error('Error during technician login:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Technician by Tech ID
export const getTechnician = async (req, res) => {
  try {
    const { techid } = req.params; // Extract techid from request parameters
    console.log('TechID received:', techid); // Log techid for debugging

    // Use techid to find the technician
    const technician = await Technician.findOne({ techid }); // Make sure to use techid here

    if (!technician) {
      return res.status(404).json({ message: 'Technician not found' });
    }

    // Format the response to include only specific fields
    const technicianData = {
      techid: technician.techid,
      techName: technician.techName,
      email: technician.email,
      phone: technician.phone,
      adharnumber: technician.adharnumber,
    };

    res.status(200).json({ technician: technicianData });
  } catch (error) {
    console.error('Error getting technician:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
// Login User


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
    console.error('Error fetching user:', error); // Log the error
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
