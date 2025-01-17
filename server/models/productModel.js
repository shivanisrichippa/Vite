


import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: {
        type: [String],
        validate: {
            validator: (val) => val.length >= 1 && val.length <= 4, // Flexible image count validation
            message: "You must upload between 1 and 4 images.",
        },
    },
    category: { type: String, required: true },
    bestseller: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }, // Use Date type for date
    rentDays: { type: Number, min: 1 },
    email: {
        type: String,
        // required: true,
        // unique: true,
    },
    verified: { type: Boolean, default: false },
   
});

const productModel = mongoose.models.product || mongoose.model('Product', productSchema);

export default productModel;
