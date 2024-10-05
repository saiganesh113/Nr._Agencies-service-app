// src/controller/fridge.controller.js
import SingleDoor from '../models/singledoor.model.js'; // Adjust path as necessary

// Single Door Controllers
export const getAllSingleDoors = async (req, res) => {
  try {
    const singleDoors = await SingleDoor.find();
    res.status(200).json(singleDoors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleDoorById = async (req, res) => {
  try {
    const singleDoor = await SingleDoor.findById(req.params.id);
    if (!singleDoor) return res.status(404).json({ message: 'Single Door not found' });
    res.status(200).json(singleDoor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSingleDoor = async (req, res) => {
  const { name, fridgeType, price, time, doorIssues } = req.body;
  const newSingleDoor = new SingleDoor({ name, fridgeType, price, time, doorIssues });

  try {
    await newSingleDoor.save();
    res.status(201).json(newSingleDoor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSingleDoor = async (req, res) => {
  try {
    const updatedSingleDoor = await SingleDoor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSingleDoor) return res.status(404).json({ message: 'Single Door not found' });
    res.status(200).json(updatedSingleDoor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSingleDoor = async (req, res) => {
  try {
    const deletedSingleDoor = await SingleDoor.findByIdAndDelete(req.params.id);
    if (!deletedSingleDoor) return res.status(404).json({ message: 'Single Door not found' });
    res.status(200).json({ message: 'Single Door deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Double Door Controllers

// Side Door Controllers

