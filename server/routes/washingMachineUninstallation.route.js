import express from 'express';
import { getAllUninstallations, createUninstallation } from '../controllers/washingMachineUninstallation.controller.js'; // Ensure correct path and extension

const router = express.Router();

// Define your routes
router.get('/', getAllUninstallations);
router.post('/', createUninstallation);

export default router;
