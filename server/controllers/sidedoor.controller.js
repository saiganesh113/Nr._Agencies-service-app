import SideDoor from '../models/sidedoor.model.js';

export const getAllSideDoors = async (req, res) => {
    try {
      const sideDoors = await SideDoor.find();
      res.status(200).json(sideDoors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getSideDoorById = async (req, res) => {
    try {
      const sideDoor = await SideDoor.findById(req.params.id);
      if (!sideDoor) return res.status(404).json({ message: 'Side Door not found' });
      res.status(200).json(sideDoor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const createSideDoor = async (req, res) => {
    const { name, fridgeType, price, time, doorIssues } = req.body;
    const newSideDoor = new SideDoor({ name, fridgeType, price, time, doorIssues });
  
    try {
      await newSideDoor.save();
      res.status(201).json(newSideDoor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const updateSideDoor = async (req, res) => {
    try {
      const updatedSideDoor = await SideDoor.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedSideDoor) return res.status(404).json({ message: 'Side Door not found' });
      res.status(200).json(updatedSideDoor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const deleteSideDoor = async (req, res) => {
    try {
      const deletedSideDoor = await SideDoor.findByIdAndDelete(req.params.id);
      if (!deletedSideDoor) return res.status(404).json({ message: 'Side Door not found' });
      res.status(200).json({ message: 'Side Door deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };