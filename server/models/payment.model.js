import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  cart: {
    type: Array,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    required: true,
    default: 'pending' // Can be 'success' or 'failed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Payment', PaymentSchema);
