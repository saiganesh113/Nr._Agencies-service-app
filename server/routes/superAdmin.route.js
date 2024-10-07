// routes/superAdmin.routes.js
import express from 'express';
import { signupSuperAdmin, loginSuperAdmin } from '../controllers/superAdmin.controller.js';

const router = express.Router();

// Signup route
router.post('/signup', signupSuperAdmin);

// Login route
router.post('/login', loginSuperAdmin);

export default router;
