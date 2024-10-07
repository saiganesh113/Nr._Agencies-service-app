// models/Email.js
import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

export default mongoose.model('Email', emailSchema);
