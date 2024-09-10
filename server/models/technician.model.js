import mongoose from 'mongoose';

const technicianSchema = new mongoose.Schema({
  techid: { type: String, required: true },
  Name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  adharnumber: { type: String, required: true },
  pancard: { type: String, required: true },
  password: { type: String, required: true },
});

const Technician = mongoose.model('Technician', technicianSchema);

export default Technician;