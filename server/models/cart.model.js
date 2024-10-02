import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        ref: 'Profile'
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
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
        type: Number,
        required: true
    },
    warranty: String,
    address: {
        type: String,
        required: true
    },
    pinnedPosition: {
        type: [Number], // [latitude, longitude]
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
