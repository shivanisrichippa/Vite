import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './SellProduct.css'; // Adjust styling as needed
import axios from 'axios';
import { backendUrl } from "../App";
import { assets } from '../assets/assets.js';

function SellProduct() {
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
  const [rentDays, setRentDays] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
    } else {
      toast.error('You must be logged in to sell a product!');
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [navigate]);

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
      setError('You must be logged in to sell a product.');
      toast.error('Please log in first!');
      return;
    }

    // Validate required fields
    if (!name || !description || !price || !category || !rentDays || !email) {
      setError('Please fill out all required fields.');
      toast.error('All fields are required.');
      return;
    }

    try {
      setLoading(true);

      // Prepare form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('rentDays', rentDays);
      formData.append('date', date);
      formData.append('status', 'pending');
      formData.append('email', email);

      // Append images
      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append(key, images[key]);
        }
      });

      // Send product data to the backend
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token,
        },
      });

      if (response.data.success) {
        toast.success('Product uploaded successfully! Waiting for admin approval.');
        // Reset form fields
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setRentDays('');
        setDate(new Date().toISOString().split('T')[0]);
        setEmail('');
        setImages({ image1: null, image2: null, image3: null, image4: null });
      } else {
        toast.error(response.data.message || 'Product upload failed.');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred while uploading the product.');
      toast.error('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="container py-4">
          <form className="product-form" onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <h2>Sell Your Product</h2>
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
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
      <ToastContainer />
    </div>
  );
}

export default SellProduct;
