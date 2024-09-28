import WashingMachineUninstallation from "../models/WashingMachineUninstallation.model.js";

// Create a new uninstallation
export const createUninstallation = async (req, res) => {
  try {
    const uninstallation = new WashingMachineUninstallation(req.body);
    await uninstallation.save();
    res.status(201).json(uninstallation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all uninstallations
export const getAllUninstallations = async (req, res) => {
  try {
    const uninstallations = await WashingMachineUninstallation.find();
    res.status(200).json(uninstallations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an uninstallation
export const updateUninstallation = async (req, res) => {
  try {
    const uninstallation = await WashingMachineUninstallation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(uninstallation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an uninstallation
export const deleteUninstallation = async (req, res) => {
  try {
    await WashingMachineUninstallation.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
