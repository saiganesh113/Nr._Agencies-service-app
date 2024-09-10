// src/route/installation.route.js
import express from 'express';
import { createInstallation, getInstallations, getInstallationById, updateInstallation, deleteInstallation } from '../controllers/installation.controller.js';

const router = express.Router();

router.post('/', createInstallation);
router.get('/', getInstallations);
router.get('/:id', getInstallationById);
router.put('/:id', updateInstallation);
router.delete('/:id', deleteInstallation);

export default router;