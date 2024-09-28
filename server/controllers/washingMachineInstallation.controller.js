import WashingMachineInstallation from "../models/WashingMachineInstallation.model.js"; // Correct model import

// Create a new installation
export const createInstallation = async (req, res) => {
  try {
    const installation = new WashingMachineInstallation(req.body);
    await installation.save();
    res.status(201).json(installation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all installations
export const getAllInstallations = async (req, res) => {
  try {
    const installations = await WashingMachineInstallation.find();
    res.status(200).json(installations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an installation
export const updateInstallation = async (req, res) => {
  try {
    const installation = await WashingMachineInstallation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(installation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an installation
export const deleteInstallation = async (req, res) => {
  try {
    await WashingMachineInstallation.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
