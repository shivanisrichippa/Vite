import express from "express";
import {
    loginUser,
    signupUser,
    adminLogin,
    getUserDetails,
    updateUserDetails
} from "../controllers/userController.js"; // Import related controller functions
import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js"; // Middleware for authentication and admin check
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

// User signup
userRouter.post('/sign-up', signupUser);

// User login
userRouter.post('/login', loginUser);

// Admin login
userRouter.post('/admin', adminLogin);

// Fetch user details (protected route)
userRouter.get('/me', authUser, getUserDetails);

// Update user details (protected route)
userRouter.post('/update', authUser, updateUserDetails);

// Admin-only dashboard route (example)
userRouter.get('/admin/dashboard', isAuthenticated, isAdmin, (req, res) => {
    res.send('Welcome to the Admin Dashboard');
});

export default userRouter;
