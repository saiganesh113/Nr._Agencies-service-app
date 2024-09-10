import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  reviews: String,
  discount: String,
  warranty: String,
  time: String,
  technology: String,
  cleaning: String,
  image: String
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;