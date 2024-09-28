import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    ref: 'Profile'
  },
  type: {
   type: String,
   required: true,
  },
  price: {
    type: Number,  // Ensure price is a number
    required: true
  },
  discount: {
    type: Number,  // Convert discount to a number to avoid issues
    default: 0
  },
  estimatedTime: String,
  image: String,
  name: String,
  reviews: String,
  slotBookedDate: String,
  slotBookedTime: Date,
  technology: String,
  time: String,
  totalPrice: {
    type: Number,  // Ensure totalPrice is a number
    required: true
  },
  warranty: String,
  address: {
    type: String,
    required: true 
  }
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);