import mongoose from 'mongoose';

const technicianSchema = new mongoose.Schema({
  techId: { type: String, required: true, unique: true },
  techName: { type: String, required: true },
  techEmail: { type: String, required: true, unique: true },
  techPhone: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  password: { type: String, required: true }
});

const Technician = mongoose.model('Technician', technicianSchema);

export default Technician;
