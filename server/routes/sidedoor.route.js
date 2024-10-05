import express from 'express';
import {
  getAllSideDoors,
  getSideDoorById,
  createSideDoor,
  updateSideDoor,
  deleteSideDoor,
} from '../controllers/sidedoor.controller.js';

const router = express.Router();

// Side Door routes
router.get('/', getAllSideDoors);
router.get('/:id', getSideDoorById);
router.post('/', createSideDoor);
router.put('/:id', updateSideDoor);
router.delete('/:id', deleteSideDoor);

export default router;