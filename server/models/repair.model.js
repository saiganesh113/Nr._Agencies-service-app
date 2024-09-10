import mongoose from 'mongoose';

const repairSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  reviews: { type: String, required: true },
  discount: { type: String, required: true },
  warranty: { type: String, required: true },
  time: { type: String, required: true },
  technology: { type: String, required: true },
  cleaning: { type: String, required: true },
  image: { type: String, required: true },
});

const Repair = mongoose.model('Repair', repairSchema);

export default Repair;