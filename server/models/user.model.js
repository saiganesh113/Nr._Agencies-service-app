import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Ensure bcrypt is imported

const userSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }
});

// Method to compare passwords
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;

// Login function should be in the controller, not in the model.
