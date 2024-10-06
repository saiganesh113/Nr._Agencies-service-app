import mongoose from 'mongoose';

// Define the CartItem schema
const cartItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    technology: { type: String },
    warranty: { type: String },
    issues: { type: [String] }, // Array of issues
    userid: {
        type: String,
        required: true,
        ref: 'Profile'
    },
    totalPrice: { type: Number, required: true },
    quantity: { type: Number, required: true }, // Ensure quantity is accounted for
    estimatedTime: { type: String }
}, {
    timestamps: true // This will automatically create createdAt and updatedAt fields
});

// Create and export the CartItem model
export default mongoose.model('CartItem', cartItemSchema);
