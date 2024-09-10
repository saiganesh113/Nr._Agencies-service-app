// In user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dateofbirth: { type: Date, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export default User;
