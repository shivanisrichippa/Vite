import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routers/userRoute.js';
import ProductRoute from './routers/productRoute.js';  // Change the import to match the new export name
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cartRouter from './routers/CartRoute.js';
import orderRouter from './routers/OrderRoute.js';


// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to the database and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(helmet()); // Adding security headers
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit to 100 requests per IP
}));
app.use(express.json());




// CORS Configuration
app.use(cors());


// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', ProductRoute);  // No changes needed here, as the import name now matches
app.use('/api/cart', cartRouter); 
app.use('/api/order', orderRouter);

app.get("/", (req, res) => {
    res.send("API is working");
});

// General error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
