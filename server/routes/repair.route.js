// src/route/repair.route.js
import express from 'express';
import { createRepair, getRepairs, getRepairById, updateRepair, deleteRepair } from '../controllers/repair.controller.js';

const router = express.Router();

router.post('/', createRepair);
router.get('/', getRepairs);
router.get('/:id', getRepairById);
router.put('/:id', updateRepair);
router.delete('/:id', deleteRepair);

export default router;