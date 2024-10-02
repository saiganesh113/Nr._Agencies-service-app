// src/model/cartItem.model.js
import mongoose from 'mongoose';

// Define the CartItem schema
const cartItemSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    required: true, // 'repair', 'installation', or 'uninstallation'
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Service', // Reference to the Service model
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  technology: {
    type: String,
  },
  warranty: {
    type: String,
  },
  issues: {
    type: [String], // Array of issues for repair items
  },
  estimatedTime: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1, // Default quantity is 1
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference to the User model
  },
}, {timestamps: true,}
);

// Create the CartItem model
export default mongoose.model('CartItem', cartItemSchema);