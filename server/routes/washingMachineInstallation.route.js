import express from 'express';
import { createInstallation, getAllInstallations, updateInstallation, deleteInstallation } from '../controllers/washingMachineInstallation.controller.js';

const router = express.Router();
// CRUD routes
router.post('/', createInstallation);
router.get('/', getAllInstallations);
router.put('/:id', updateInstallation);
router.delete('/:id', deleteInstallation);

export default router;
