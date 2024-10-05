import express from 'express';
import {
  getAllDoubleDoors,
  getDoubleDoorById,
  createDoubleDoor,
  updateDoubleDoor,
  deleteDoubleDoor,
} from '../controllers/doubledoor.controller.js';

const router = express.Router();

// Double Door routes
router.get('/', getAllDoubleDoors);
router.get('/:id', getDoubleDoorById);
router.post('/', createDoubleDoor);
router.put('/:id', updateDoubleDoor);
router.delete('/:id', deleteDoubleDoor);

export default router;