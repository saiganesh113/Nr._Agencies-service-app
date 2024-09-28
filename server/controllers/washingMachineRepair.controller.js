import WashingMachineRepair from "../models/WashingMachineRepair.model.js";

// Create a new repair
export const createRepair = async (req, res) => {
  try {
    const repair = new WashingMachineRepair(req.body);
    await repair.save();
    res.status(201).json(repair);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all repairs
export const getAllRepairs = async (req, res) => {
  try {
    const repairs = await WashingMachineRepair.find();
    res.status(200).json(repairs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a repair
export const updateRepair = async (req, res) => {
  try {
    const repair = await WashingMachineRepair.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(repair);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a repair
export const deleteRepair = async (req, res) => {
  try {
    await WashingMachineRepair.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
