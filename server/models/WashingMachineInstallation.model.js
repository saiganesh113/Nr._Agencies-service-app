import mongoose from 'mongoose';

const washingMachineInstallationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  time: { type: String, required: true },
  technology: { type: String },
  warranty: { type: String },
});

const WashingMachineInstallation = mongoose.model('WashingMachineInstallation', washingMachineInstallationSchema);
export default WashingMachineInstallation;
