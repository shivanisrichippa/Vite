import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: String,
    id: String,
    year: String,
    image: String, // Path to the uploaded college ID card
    cartData: {
        type: Object,
        default: {}
    },
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model('User', userSchema);

export default userModel;
