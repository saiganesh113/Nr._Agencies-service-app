// src/route/fridge.routes.js
import express from 'express';
import {
  getAllSingleDoors,
  getSingleDoorById,
  createSingleDoor,
  updateSingleDoor,
  deleteSingleDoor,
} from '../controllers/singledoor.controller.js';

const router = express.Router();

// Single Door routes
router.get('/', getAllSingleDoors);
router.get('/:id', getSingleDoorById);
router.post('/', createSingleDoor);
router.put('/:id', updateSingleDoor);
router.delete('/:id', deleteSingleDoor);

export default router;
