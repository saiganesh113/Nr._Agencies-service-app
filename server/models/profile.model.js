import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure email is unique as well
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  photo: {
    type: String, // URL or base64 string
    required: false
  }
});

export default mongoose.model('Profile', profileSchema);
