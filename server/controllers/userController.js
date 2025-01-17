
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import Admin from "../models/adminModel.js"
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import connectCloudinary from '../config/cloudinary.js'; // Import the connectCloudinary function
connectCloudinary(); // Call this to ensure Cloudinary is properly configured

const createToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage }).single('image');

// Signup function
const signupUser = async (req, res) => {
    try {
        // File upload middleware
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: "File upload failed" });
            }

            const { name, email, password, address, id, year } = req.body;
            const image = req.file;  // Multer handles the file upload and puts it in req.file

            // Checking if user already exists
            const exists = await userModel.findOne({ email });
            if (exists) {
                return res.json({ success: false, message: "User already exists" });
            }

            // Validating email format and password strength
            if (!validator.isEmail(email)) {
                return res.json({ success: false, message: "Please enter a valid email" });
            }
            if (password.length < 8) {
                return res.json({ success: false, message: "Password must be at least 8 characters long" });
            }

            // Hashing the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Handle image upload to Cloudinary if available
            let imageUrl = '';
            if (image) {
                const result = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
                imageUrl = result.secure_url; // Storing the image URL in the database
            }

            // Creating new user
            const newUser = new userModel({
                name,
                email,
                password: hashedPassword,
                address,
                id,
                year,
                image: imageUrl  // Storing the image URL in the 'image' field
            });

            const user = await newUser.save();
            const token = createToken(user._id);

            res.json({ success: true, token });
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // If passwords match, create a token
            const token = createToken(user._id);

            // Respond with success and token
            res.json({ success: true, token });
        } else {
            // If passwords don't match, return error message
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    // Verify credentials with environment variables
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("Token generated successfully:", token);

    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default adminLogin;

export const updateUserDetails = async (req, res) => {
    try {
      const userId = req.body.userId; // Access the user ID from req.body.userId
      const updates = req.body; // Get the update fields
  
      // Find the user by userId and update their details
      const user = await userModel.findByIdAndUpdate(userId, updates, { new: true }).select("-password");
      if (user) {
        res.json({ success: true, updatedUser: user });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  

export const getUserDetails = async (req, res) => {
    try {
      const userId = req.body.userId; // Get userId from req.body
      console.log("Authenticated user ID:", userId); // Log for debugging
  
      // Fetch the user from the database using the userId from the token
      const user = await userModel.findById(userId).select("-password");
      if (user) {
        res.json(user); // Return user data without password
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      console.error("Error in getUserDetails:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  
export { signupUser, loginUser, adminLogin};
