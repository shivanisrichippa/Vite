
import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB connected");
    });

    mongoose.connection.on('error', (err) => {
        console.error(`DB connection error: ${err.message}`);
    });

    try {
        await mongoose.connect('mongodb+srv://shivanisrichippa:$hiva14CH@cluster0.0ovxi.mongodb.net/SwipeShare');
        console.log("Database connection established");
    } catch (err) {
        console.error("Failed to connect to the database", err);
    }
};

export default connectDB;
