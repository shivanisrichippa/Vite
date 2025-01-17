import express from 'express';
import {placeOrder,placeOrderStripe, placeOrderRazorpay,allOrders,userOrders,updateStatus,cancelOrder ,verifyPayment} from '../controllers/oderController.js'
import adminModel from '../middleware/adminAuth.js';
import authUser from "../middleware/auth.js";
import adminAuth from '../middleware/adminAuth.js';

const orderRouter=express.Router()


// Admin features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/verify-payment', authUser, verifyPayment); // Add this route

// User features
orderRouter.post('/userorders', authUser, userOrders);
orderRouter.post('/cancel', authUser, cancelOrder);

export default orderRouter;
