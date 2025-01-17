import express from 'express';
import {
    addProduct,
    singleProduct,
    listAllProducts,
    verifyProduct,
    removeProduct,
    listVerifiedProducts,
    updateProduct,
} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const ProductRoute = express.Router();

// User Routes
ProductRoute.post('/add', 
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]), 
  addProduct
);

ProductRoute.get('/single/:id', singleProduct); // Get a single product
ProductRoute.get('/list/verified', listVerifiedProducts); // Fetch verified products for user frontend

// Admin Routes
ProductRoute.get('/list', listAllProducts); // List all products
ProductRoute.delete('/remove/:id', removeProduct); // Remove a product
ProductRoute.post('/verify/:id', verifyProduct); // Verify a product
ProductRoute.post('/update/:id', updateProduct);

export default ProductRoute;
