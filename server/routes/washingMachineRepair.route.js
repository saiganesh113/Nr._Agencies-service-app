import express from 'express';
import { getAllRepairs, createRepair } from '../controllers/washingMachineRepair.controller.js'; // Ensure correct path and extension

const router = express.Router();

// Define your routes
router.get('/', getAllRepairs);
router.post('/', createRepair);

export default router;
