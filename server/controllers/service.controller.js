// src/controller/service.controller.js
import Service from '../models/service.model.js';

// Create Service
export const createService = async (req, res) => {
    try {
        const service = new Service(req.body);
        const savedService = await service.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(400).json({ message: 'Error creating service', error });
    }
};

// Get All Services
export const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving services', error });
    }
};

// Get Service by ID
export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving service', error });
    }
};

// Update Service
export const updateService = async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedService) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(400).json({ message: 'Error updating service', error });
    }
};

// Delete Service
export const deleteService = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json(deletedService);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error });
    }
};