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

// CORS configuration to allow both user and admin panel frontends
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both frontends
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Add PATCH method
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
}));

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
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
