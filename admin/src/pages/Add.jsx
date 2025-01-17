
import React, { useState, useEffect } from 'react';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Add.css';
import axios from 'axios';
import { backendUrl } from "../App";
import { assets } from '../assets/assets.js';

function Add() {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [rentDays, setRentDays] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    } else {
      setError('You must be logged in to add a product.');
    }
  }, []);

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    setImages((prevImages) => ({
      ...prevImages,
      [key]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Check if user is logged in
    if (!token) {
      setError('You must be logged in to add a product.');
      return;
    }
  
    // Validate required fields
    if (!name || !description || !price || !category || !rentDays) {
      setError('Please fill out all required fields.');
      return;
    }
  
    try {
      setLoading(true);
  
      // Prepare form data to send to the server
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('bestseller', bestseller.toString());
      formData.append('date', date);
      formData.append('rentDays', rentDays);
      
  
      // Append images to form data
      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append(key, images[key]);
        }
      });
  
      // Send the data to the backend API
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          token
        },
      });
  
      // Check response success
      if (response.data.success) {
        toast.success('Product uploaded successfully!');
        // Reset form fields
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setImages({ image1: null, image2: null, image3: null, image4: null });
        setDate(new Date().toISOString().split('T')[0]);
        setRentDays('');
        setBestseller(false);
      } else {
        // Handle failure message from the backend
        toast.error(response.data.message || 'Product upload failed.');
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred while adding the product.');
      toast.error('An error occurred, please try again.');
      setLoading(false);
    }
  };
  
  return (
    <div className="app-container">
      <div className="main-content">
        <div className="container py-4">
          <form className="product-form" onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <h2>Upload Product</h2>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row mb-4">
              {['image1', 'image2', 'image3', 'image4'].map((key, index) => (
                <div className="col-12 col-sm-6 col-md-3" key={key}>
                  <label htmlFor={key} className="upload-container">
                    <img
                      src={
                        images[key] ? URL.createObjectURL(images[key]) : assets.upload_area
                      }
                      alt={`Upload Area ${index + 1}`}
                      className="upload-image img-fluid"
                    />
                    <input
                      type="file"
                      id={key}
                      hidden
                      onChange={(e) => handleImageChange(e, key)}
                    />
                  </label>
                </div>
              ))}
            </div>

            {/* Product Details */}
            <div className="form-group mb-3">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="rentDays">Rent Days</label>
              <input
                type="number"
                id="rentDays"
                className="form-control"
                value={rentDays}
                onChange={(e) => setRentDays(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="bestseller">Best Seller</label>
              <input
                type="checkbox"
                id="bestseller"
                checked={bestseller}
                onChange={() => setBestseller(!bestseller)}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add;
