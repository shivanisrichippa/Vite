import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaShoppingCart, FaClipboardList, FaSave } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Account = () => {
  const { token, backendUrl } = useContext(ShopContext); // Use ShopContext
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken'); // Get token from localStorage
      if (token) {
        try {
          const response = await axios.get(`${backendUrl}/api/user/me`, {
            headers: { Authorization: `Bearer ${token}` }, // Correct format
          });
          setUser(response.data); // Set the fetched user data
          setFormData(response.data); // Initialize form data
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error(error.response?.data?.message || 'Unable to fetch user details.');
          navigate('/login'); // Redirect to login if the fetch fails
        }
      } else {
        toast.error('Authentication required. Please log in.');
        navigate('/login'); // Redirect if no token
      }
    };

    fetchUserData();
  }, [token, backendUrl, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle user update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setUser(response.data.updatedUser); // Update user state
        toast.success('Account details updated successfully!');
        setIsEditing(false); // Exit editing mode
      } else {
        toast.error(response.data.message || 'Failed to update account details.');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error(error.response?.data?.message || 'Failed to update account details.');
    }
  };

  return (
    <div className="container mt-5 mb-5"> {/* Added mb-5 for bottom margin */}
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Hello, {user.name || 'User'}!</h2>
            <p className="text-muted">Manage your account details, orders, and cart here.</p>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center mb-3">Your Account Details</h4>
              {isEditing ? (
                <form onSubmit={handleUpdate}>
                  <div className="form-group mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Address</label>
                    <textarea
                      name="address"
                      className="form-control"
                      rows="3"
                      value={formData.address || ''}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="form-group mb-3">
                    <label>ID Number</label>
                    <input
                      type="text"
                      name="id"
                      className="form-control"
                      value={formData.id || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Year</label>
                    <input
                      type="text"
                      name="year"
                      className="form-control"
                      value={formData.year || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-success w-100">
                      <FaSave className="me-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Name:</strong> {user.name}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {user.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Address:</strong> {user.address}
                  </li>
                  <li className="list-group-item">
                    <strong>ID Number:</strong> {user.id}
                  </li>
                  <li className="list-group-item">
                    <strong>Year:</strong> {user.year}
                  </li>
                  {user.image && (
                    <li className="list-group-item text-center">
                      <strong>College ID:</strong>
                      <img
                        src={user.image}
                        alt="College ID"
                        className="img-thumbnail"
                        style={{ maxWidth: '200px', marginTop: '10px' }}
                      />
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              className="btn btn-warning w-100 mb-3"
              onClick={() => setIsEditing(!isEditing)}
            >
              <FaEdit className="me-2" />
              {isEditing ? 'Cancel' : 'Edit Your Details'}
            </button>
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={() => navigate('/cart')}
            >
              <FaShoppingCart className="me-2" />
              View Your Cart
            </button>
            <button
              className="btn btn-success w-100"
              onClick={() => navigate('/orders')}
            >
              <FaClipboardList className="me-2" />
              View Your Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
