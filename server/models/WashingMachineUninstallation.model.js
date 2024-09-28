import mongoose from 'mongoose';

const washingMachineUninstallationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  time: { type: String, required: true },
  technology: { type: String },
  warranty: { type: String },
});

const WashingMachineUninstallation = mongoose.model('WashingMachineUninstallation', washingMachineUninstallationSchema);
export default WashingMachineUninstallation;
