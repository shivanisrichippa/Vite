
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import productModel from '../models/productModel.js';
import adminModel from '../models/adminModel.js';


export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, bestseller, rentDays, email } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(item => item !== undefined);

        if (images.length === 0) {
            return res.status(400).json({ success: false, message: "At least one image is required." });
        }

        // Upload images to Cloudinary and get URLs
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });

                // Check if the file exists before trying to delete it
                if (fs.existsSync(item.path)) {
                    fs.unlinkSync(item.path); // Delete the file from the server after uploading to Cloudinary
                } else {
                    console.warn(`File not found, skipping delete: ${item.path}`);
                }

                return result.secure_url;
            })
        );

        // Create the product object
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            rentDays,
            bestseller: bestseller === "true" ? true : false,
            image: imagesUrl,
            date: Date.now(),
            email,
        };

        // Save the product in the database
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product added successfully" });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: error.message || 'Failed to add product.' });
    }
};



// Get Details of a Single Product
export const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product ID is required.' });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        res.json({ success: true, product });
    } catch (error) {
        console.error('Error fetching single product:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// List All Products (Admin Panel)
export const listAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Error fetching products.' });
    }
};

// List User Products (User View)
export const listUserProducts = async (req, res) => {
    try {
        const { email } = req.query; // Filter by user email
        const products = await productModel.find({ email });
        res.json({ success: true, products });
    } catch (error) {
        console.error('Error fetching user products:', error);
        res.status(500).json({ success: false, message: 'Error fetching user products.' });
    }
};
// productController.js

export const verifyProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the product by ID and update the `verified` status
      const product = await productModel.findByIdAndUpdate(
        id,
        { verified: true }, // Update the `verified` field to true
        { new: true } // Return the updated product
      );
  
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, product });
    } catch (error) {
      console.error('Error verifying product:', error);
      res.status(500).json({ success: false, message: 'Failed to verify the product' });
    }
  };
  
// List Verified Products
export const listVerifiedProducts = async (req, res) => {
    try {
        const products = await productModel.find({ verified: true });
        res.json({ success: true, products });
    } catch (error) {
        console.error('Error fetching verified products:', error);
        res.status(500).json({ success: false, message: 'Error fetching verified products.' });
    }
};

// Remove Product (Admin Only)
export const removeProduct = async (req, res) => {
    const { id } = req.params; // Use URL params for product ID

    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        // Delete associated images from Cloudinary
        for (const url of product.image) {
            const publicId = url.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
        }

        await productModel.findByIdAndDelete(id);
        res.json({ success: true, message: 'Product removed successfully.' });
    } catch (error) {
        console.error('Error in removeProduct:', error);
        res.status(500).json({ success: false, message: 'Failed to delete product.' });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, rentDays, email } = req.body;
        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const image3 = req.files?.image3 && req.files.image3[0];
        const image4 = req.files?.image4 && req.files.image4[0];
        const images = [image1, image2, image3, image4].filter(item => item !== undefined);
        
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Upload new images if provided
        let imagesUrl = product.image;
        if (images.length > 0) {
            // Delete old images from Cloudinary
            for (const url of product.image) {
                const publicId = url.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
            }

            // Upload new images to Cloudinary
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                    if (fs.existsSync(item.path)) {
                        fs.unlinkSync(item.path);
                    }
                    return result.secure_url;
                })
            );
        }

        // Update the product
        const updatedProduct = await productModel.findByIdAndUpdate(id, {
            name,
            description,
            price: Number(price),
            category,
            rentDays,
            email,
            image: imagesUrl,
        }, { new: true });

        res.json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Failed to update product' });
    }
};

