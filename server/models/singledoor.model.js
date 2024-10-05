// src/model/fridge.model.js
import mongoose from 'mongoose';

const singleDoorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fridgeType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  doorIssues: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('SingleDoor', singleDoorSchema);
