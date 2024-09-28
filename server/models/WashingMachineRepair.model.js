import mongoose from 'mongoose';

const washingMachineRepairSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  time: { type: String, required: true },
  issues: [{ type: String }],
});

const WashingMachineRepair = mongoose.model('WashingMachineRepair', washingMachineRepairSchema);
export default WashingMachineRepair;
