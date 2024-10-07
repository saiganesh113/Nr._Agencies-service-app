import express from 'express';
import {
  registerTechnician,
  loginTechnician,
  registerUser,
  loginUser,
  getTechnician,
  getUser,
  updateTechnician,
  updateUser,
  getAllTechnicians,
  getAllUsers,
} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Technician routes
router.post('/register-technician', registerTechnician);
router.post('/login-technician', loginTechnician);
router.get('/technician/:techid', protectRoute, getTechnician); // Updated here
router.put('/technician/:techid', protectRoute, updateTechnician); // Updated here
router.get('/technicians', getAllTechnicians);

// User routes
router.post('/register-user', registerUser);
router.post('/login-user', loginUser);
router.get('/user/:userid', protectRoute, getUser);
router.put('/user/:userid', protectRoute, updateUser);
router.get('/users', getAllUsers);

export default router;
