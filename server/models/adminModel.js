// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// // Define the schema for the admin
// const adminSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// }, { timestamps: true });

// // Hash the password before saving to the database
// adminSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();

//     // Hash the password with a salt rounds of 10
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

// // Compare entered password with the hashed password in the database
// adminSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// // Create the model
// const Admin = mongoose.model('Admin', adminSchema);

// export default Admin;



import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema for the admin
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Hash the password before saving to the database
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        // Hash the password with a salt rounds of 10
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        return next(error); // Pass the error to the next middleware (error handler)
    }
});

// Compare entered password with the hashed password in the database
adminSchema.methods.comparePassword = async function (enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        throw new Error('Error comparing password');
    }
};

// Create the model
// const Admin = mongoose.model('Admin', adminSchema);

const Admin = mongoose.models.admin || mongoose.model('Admin', adminSchema);

export default Admin;
