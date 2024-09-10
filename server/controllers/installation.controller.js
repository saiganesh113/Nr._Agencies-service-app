// src/controller/installation.controller.js
import Installation from '../models/installation.model.js';

// Create Installation
export const createInstallation = async (req, res) => {
    try {
        const installation = new Installation(req.body);
        const savedInstallation = await installation.save();
        res.status(201).json(savedInstallation);
    } catch (error) {
        res.status(400).json({ message: 'Error creating installation', error });
    }
};

// Get All Installations
export const getInstallations = async (req, res) => {
    try {
        const installations = await Installation.find();
        res.status(200).json(installations);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving installations', error });
    }
};

// Get Installation by ID
export const getInstallationById = async (req, res) => {
    try {
        const installation = await Installation.findById(req.params.id);
        if (!installation) return res.status(404).json({ message: 'Installation not found' });
        res.status(200).json(installation);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving installation', error });
    }
};

// Update Installation
export const updateInstallation = async (req, res) => {
    try {
        const updatedInstallation = await Installation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedInstallation) return res.status(404).json({ message: 'Installation not found' });
        res.status(200).json(updatedInstallation);
    } catch (error) {
        res.status(400).json({ message: 'Error updating installation', error });
    }
};

// Delete Installation
export const deleteInstallation = async (req, res) => {
    try {
        const deletedInstallation = await Installation.findByIdAndDelete(req.params.id);
        if (!deletedInstallation) return res.status(404).json({ message: 'Installation not found' });
        res.status(200).json(deletedInstallation);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting installation', error });
    }
};