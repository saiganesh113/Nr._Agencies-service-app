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
router.get('/technician/:techid', protectRoute, getTechnician);
router.put('/technician/:techid', protectRoute, updateTechnician);
router.get('/technicians', protectRoute, getAllTechnicians);

// User routes
router.post('/register-user', registerUser);
router.post('/login-user', loginUser);
router.get('/user/:userid', protectRoute, getUser);
router.put('/user/:userid', protectRoute, updateUser);
router.get('/users', protectRoute, getAllUsers);

export default router;
