// src/controller/repair.controller.js
import Repair from '../models/repair.model.js';

// Create Repair
export const createRepair = async (req, res) => {
    try {
        const repair = new Repair(req.body);
        const savedRepair = await repair.save();
        res.status(201).json(savedRepair);
    } catch (error) {
        res.status(400).json({ message: 'Error creating repair', error });
    }
};

// Get All Repairs
export const getRepairs = async (req, res) => {
    try {
        const repairs = await Repair.find();
        res.status(200).json(repairs);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving repairs', error });
    }
};

// Get Repair by ID
export const getRepairById = async (req, res) => {
    try {
        const repair = await Repair.findById(req.params.id);
        if (!repair) return res.status(404).json({ message: 'Repair not found' });
        res.status(200).json(repair);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving repair', error });
    }
};

// Update Repair
export const updateRepair = async (req, res) => {
    try {
        const updatedRepair = await Repair.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedRepair) return res.status(404).json({ message: 'Repair not found' });
        res.status(200).json(updatedRepair);
    } catch (error) {
        res.status(400).json({ message: 'Error updating repair', error });
    }
};

// Delete Repair
export const deleteRepair = async (req, res) => {
    try {
        const deletedRepair = await Repair.findByIdAndDelete(req.params.id);
        if (!deletedRepair) return res.status(404).json({ message: 'Repair not found' });
        res.status(200).json(deletedRepair);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting repair', error });
    }
};