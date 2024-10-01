import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Make sure to install bcrypt

const technicianSchema = new mongoose.Schema({
  techid: { type: String, required: true, unique: true },
  techName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  adharnumber: { type: String, required: true },
  password: { type: String, required: true },
});

// Method to compare passwords
technicianSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const Technician = mongoose.model('Technician', technicianSchema);

export default Technician;