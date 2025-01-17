import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Add from './pages/Add';
import ProductList from './pages/ProductList';
import EditOrder from './pages/EditOrder';
import Orders from './pages/Orders'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Function to check if the token is valid
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    const expiration = decodedToken.exp * 1000; // Convert to milliseconds
    return expiration > Date.now(); // Return true if token is still valid
  } catch (error) {
    return false;
  }
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true); // Loading state to manage token check
  const navigate = useNavigate();

  useEffect(() => {

    const storedToken = localStorage.getItem('token');

    if (storedToken && !isTokenValid(storedToken)) {
      // If the token is invalid or expired, remove it and redirect to login
      localStorage.removeItem('token');
      setToken('');
      navigate('/login');

    } else if (storedToken) {
      // If the token is valid, store it in localStorage
      setToken(storedToken);

      if (window.location.pathname === '/login') {
        navigate('/');
      }

    } else {
      localStorage.removeItem('token');
    }

    setLoading(false); // Set loading to false once the token validation is complete
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // You can show a loader or a splash screen here
  }

  return (
    <div className="app-container">
      <ToastContainer/>
      {token === "" ? (
        // If token is empty, show login page
        <Login setToken={setToken} />
      ) : (
        <div className="d-flex">
          {/* Sidebar and Navbar should only be visible if token is valid */}
          <Sidebar />
          <div className="flex-grow-1">
            <Navbar />
            <div className="container-fluid content-area p-4">
              <Routes>
                {/* Define all routes for the app */}
                <Route path="/" element={<Dashboard token={token} />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/list" element={<ProductList token={token} />} />
                <Route path="/edit-order/:id" element={<EditOrder token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
