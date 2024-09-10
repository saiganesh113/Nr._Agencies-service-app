import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    ref: 'Profile' // Reference the Profile model by username
  },
  type: String,
  price: Number,
  discount: String,
  estimatedTime: String,
  image: String,
  name: String,
  reviews: String,
  slotBookedDate: String,
  slotBookedTime: Date,
  technology: String,
  time: String,
  totalPrice: Number,
  warranty: String,
  address: {
    type: String,
    required: true 
  }
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
