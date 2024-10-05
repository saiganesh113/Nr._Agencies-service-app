import DoubleDoor from '../models/doubledoor.model.js';

export const getAllDoubleDoors = async (req, res) => {
    try {
      const doubleDoors = await DoubleDoor.find();
      res.status(200).json(doubleDoors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getDoubleDoorById = async (req, res) => {
    try {
      const doubleDoor = await DoubleDoor.findById(req.params.id);
      if (!doubleDoor) return res.status(404).json({ message: 'Double Door not found' });
      res.status(200).json(doubleDoor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const createDoubleDoor = async (req, res) => {
    const { name, fridgeType, price, time, doorIssues } = req.body;
    const newDoubleDoor = new DoubleDoor({ name, fridgeType, price, time, doorIssues });
  
    try {
      await newDoubleDoor.save();
      res.status(201).json(newDoubleDoor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const updateDoubleDoor = async (req, res) => {
    try {
      const updatedDoubleDoor = await DoubleDoor.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedDoubleDoor) return res.status(404).json({ message: 'Double Door not found' });
      res.status(200).json(updatedDoubleDoor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const deleteDoubleDoor = async (req, res) => {
    try {
      const deletedDoubleDoor = await DoubleDoor.findByIdAndDelete(req.params.id);
      if (!deletedDoubleDoor) return res.status(404).json({ message: 'Double Door not found' });
      res.status(200).json({ message: 'Double Door deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  